import { Solution } from 'src/utilities/solver';
import Jimp from 'jimp';

interface Direction {
    dir: string;
    length: number;
}

interface WireLength {
    wire1Length: number;
    wire2Length: number;
    x: number;
    y: number;
}

export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
        const canvas: number[][][] = [];
      
        const directionsA = getDirections(input[0]);
        const directionsB = getDirections(input[1]);

        const distances: number[] = [];

        travel(canvas, directionsA, 1, distances);
        travel(canvas, directionsB, 2, distances);

        print(canvas, -500, 500);

        return Math.min(...distances);
    }

    async solvePart2(input: string[]) {
        const canvas: number[][][] = [];
      
        const directionsA = getDirections(input[0]);
        const directionsB = getDirections(input[1]);

        const distances: number[] = [];
        const wireDistances: number[] = [];
        const wireLengths: WireLength[][] = [];

        travel(canvas, directionsA, 1, distances, wireLengths, wireDistances);
        travel(canvas, directionsB, 2, distances, wireLengths, wireDistances);

        return Math.min(...wireDistances);
    }
}

function getDirections(line: string) {
    return line.split(',').map(direction => ({
        dir: direction[0],
        length: parseInt(direction.substring(1), 10)
    }))
}

function travel(canvas: number[][][], directions: Direction[], index: number, distances: number[], wireLengths: WireLength[][] = [], wireDistances: number[] = []) {
    const origX = 0;
    const origY = 0;

    let currX = origX;
    let currY = origY;

    let totalDistance = 0;

    directions.forEach(({dir, length}) => {
        for(let i = 0; i < length; i++) {

            totalDistance++;
            const res = move(currX, currY, dir);
            currX = res.currX;
            currY = res.currY;

            if(!canvas[currY]) {
                canvas[currY] = [];
            }

            if(!canvas[currY][currX]) {
                canvas[currY][currX] = [];
            }

            if(canvas[currY][currX].includes(index)) {
                continue;
            }

            let existingLength = wireLengths[currX]?.[currY];
            if(!existingLength) {
                existingLength = {
                    x: currX, y: currY, wire1Length: 0, wire2Length: 0
                };
                if(!wireLengths[currX]) {
                    wireLengths[currX] = [];
                }
                wireLengths[currX][currY] = existingLength;
            }

            if( index === 1 && existingLength.wire1Length === 0) {
                existingLength.wire1Length = totalDistance;
            } 
            if ( index === 2 && existingLength.wire2Length === 0) {
                existingLength.wire2Length = totalDistance;
            }

            if(canvas[currY][currX].length) {
                distances.push(getDistance(currX, currY));
                wireDistances.push(existingLength.wire1Length + existingLength.wire2Length);
            }

            canvas[currY][currX].push(index);
        }
    })
}

function getDistance(currX: number, currY: number) {
    return Math.abs(currX) + Math.abs(currY);
}

function move(currX: number, currY: number, dir: string) {
    switch(dir) {
        case 'U':
            return { currX, currY: currY - 1};
        case 'D':
            return { currX, currY: currY + 1};
        case 'L':
            return { currX: currX - 1, currY};
        case 'R':
            return { currX: currX + 1, currY};
        default:
            throw "Nope";
    }
}

function print(canvas: number[][][], lowerBound: number, upperBound: number) {
    const size = Math.abs(lowerBound - upperBound) + 1;
    new Jimp(size, size, (err, img) => {
        if(err) throw err;

        for(let y = lowerBound; y <= upperBound; y++){
            for(let x = lowerBound; x <= upperBound; x++) {
                const data = canvas[y]?.[x]?.length;
                const color = data === 2 ? 0xFF0000FF : data === 1 ? 0x000000FF : 0xFFFFFFFF;
                img.setPixelColor(color, x - lowerBound, y - lowerBound);
            }
        }

        img.write('output.png', (err) => {
            if (err) throw err;
        });
    });
}
