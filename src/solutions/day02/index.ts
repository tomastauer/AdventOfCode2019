import { Solution } from 'src/utilities/solver';


export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
        return this.computeForPair(input, 12, 2)[0];
    }

    async solvePart2(input: string[]) {
        for(let p1 = 0; p1 <= 99; p1++) {
            for(let p2 = 0; p2 <= 99; p2++) {
                const result = this.computeForPair(input, p1, p2);
                if(result[0] === 19690720) {
                    return result[1] * 100 + result[2];
                }
            }
        }
        return 0;
    }

    computeForPair(input: string[], noun: number, verb: number): number[] {
        const arr = input[0].split(',').map(a => parseInt(a, 10));
        arr[1] = noun;
        arr[2] = verb;

        let curr = 0;
        while(arr[curr * 4] !== 99) {
            const start = curr * 4;
            const val1 = arr[arr[start + 1]];
            const val2 = arr[arr[start + 2]];

            arr[arr[start + 3]] = arr[start] === 1 ? val1 + val2 : val1 * val2;

            curr ++;
        }

        return arr;
    }
}