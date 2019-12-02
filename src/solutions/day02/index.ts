import { Solution } from 'src/utilities/solver';


export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
        const arr = input[0].split(',').map(a => parseInt(a, 10));
        arr[1] = 12;
        arr[2] = 2;

        let curr = 0;
        while(arr[curr * 4] !== 99) {
            const start = curr * 4;
            const val1 = arr[arr[start + 1]];
            const val2 = arr[arr[start + 2]];

            arr[arr[start + 3]] = arr[start] === 1 ? val1 + val2 : val1 * val2;

            curr ++;
        }

        return arr[0];
    }

    async solvePart2(input: string[]) {
        const arr = input[0].split(',').map(a => parseInt(a, 10));
       
        let curr = 0;
        while(arr[curr * 4] !== 99) {
            const start = curr * 4;
            const val1 = arr[arr[start + 1]];
            const val2 = arr[arr[start + 2]];

            arr[arr[start + 3]] = arr[start] === 1 ? val1 + val2 : val1 * val2;

            curr ++;

            if(arr[0] === 19690720) {
                console.log('done');
                break;
            }
        }

        return arr[0];
    }
}