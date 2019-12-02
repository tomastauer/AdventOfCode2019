import { Solution } from 'src/utilities/solver';


export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
        return input.reduce((agg, curr) => agg + Math.floor(parseInt(curr, 10) / 3) - 2, 0);
    }

    async solvePart2(input: string[]) {
        const arr = input.map(i => parseInt(i, 10));
        let result = 0;
        while(arr.length) {
            const tmp = Math.max(Math.floor(arr.shift()! / 3) - 2, 0);
            if(tmp > 0) {
                arr.push(tmp);
            }
            result += tmp;
        }
		
       return result;
    }
}