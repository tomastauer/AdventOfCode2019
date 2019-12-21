import { Solution } from 'src/utilities/solver';
import { readlink } from 'fs';

interface Output {
	isHalted: boolean;
	lastOutput?: number;
	nextInstruction: number;
}

export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
        const arr = input[0].split(',').map(a => parseInt(a, 10));
      
		let curr = 0;
		let lastOutput = 0;
        while(true) {
			const output = this.runInstruction(arr, curr, 1);

			if(output.lastOutput) {
				lastOutput = output.lastOutput;
			}
			if(output.isHalted) {
				return lastOutput;
			}
			curr = output.nextInstruction;
		}
    }

    async solvePart2(input: string[]) {
        return 0;
    }
	
	runInstruction(input: number[], instPosition: number, userInput: number): Output {
		const opInput = input[instPosition];
		const stringified = opInput.toString();

		const opCode = parseInt(stringified.substr(-2));
		const opParams = stringified.substring(0, stringified.length - 2).split('').reverse();

		const getParamMode = (idx: number) => opParams[idx] ?? '0' === '0' ? 0 : 1;
		const getArg = (idx: number) => getParamMode(idx) === 0 ? input[input[instPosition + idx + 1]] : parseInt(opParams[idx]);

		let lastOutput: number | undefined = undefined;
		let isHalted = false;
		let nextInstruction = 0;
		switch(opCode) {
			case 1: {
				const argA = getArg(0); 
				const argB = getArg(1); 
				input[input[instPosition + 3]] = argA + argB;
				nextInstruction = instPosition + 4;
				break;
			}
			case 2: {
				const argA = getArg(0); 
				const argB = getArg(1); 
				input[input[instPosition + 3]] = argA * argB;
				nextInstruction = instPosition + 4;
				break;
			}
			case 3: {
				input[input[instPosition + 1]] = userInput;
				console.log('input', instPosition);
				nextInstruction = instPosition + 2;
				break;
			}
			case 4: {
				lastOutput = input[instPosition + 1];
				console.log('output', lastOutput);
				nextInstruction = instPosition + 2;
				break;
			}
			case 99: {
				isHalted = true;
				break;
			}
		}

		return { isHalted, lastOutput, nextInstruction };
	}
}