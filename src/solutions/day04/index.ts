import { Solution } from 'src/utilities/solver';


export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
		const [lowerBound, upperBound] = input[0].split('-').map(i => parseInt(i));

		const result = [];
        for(let i = lowerBound; i<= upperBound; i++) {
			if(this.isNotDecreasingAndHasSomeDouble(i)) {
				result.push(i);
			}
		}

		return result.length;
    }

    async solvePart2(input: string[]) {
        const [lowerBound, upperBound] = input[0].split('-').map(i => parseInt(i));

		const result = [];
        for(let i = lowerBound; i<= upperBound; i++) {
			if(this.isNotDecreasingAndHasSomeDouble(i) && this.containsAtLeastOneExactDouble(i)) {
				result.push(i);
			}
		}

		return result.length;
	}

	isNotDecreasingAndHasSomeDouble(input: number) {
		const stringified = input.toString();
		let notDecreasing = true;
		let hasSomeDouble = false
		for(let i = 0; i <= 4; i++) {
			notDecreasing = notDecreasing && stringified.charAt(i) <= stringified.charAt(i+1);
			hasSomeDouble = hasSomeDouble || stringified.charAt(i) === stringified.charAt(i+1)
		}

		return notDecreasing && hasSomeDouble;
	}

	containsAtLeastOneExactDouble(input: number) {
		const stringified = input.toString();

		let result = false;

		for(let i = 1; i<=9; i++) {
			const mustContain = i.toString().repeat(2);
			const mustNotContain = i.toString().repeat(3);
			result = result || (stringified.includes(mustContain) && !stringified.includes(mustNotContain));
		}

		return result;
	}
}