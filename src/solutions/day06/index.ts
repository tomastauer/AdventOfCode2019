import { Solution } from 'src/utilities/solver';
import { readlink } from 'fs';
import { SIGABRT } from 'constants';

interface ParsedOrbit {
	name: string;
	orbits: string;
}

interface Planet {
	name: string;
	orbits: Planet;
	chainDepth: number;
}

export default class Day01 implements Solution {
    async solvePart1(input: string[]) {
		const parsedInput = input.map((i): ParsedOrbit => { 
			const [orbits, name] = i.split(')');
			return {
				name, orbits
			}
		});

		const root: Planet = {
			name: 'COM',
			chainDepth: 0,
			orbits: {} as Planet
		};

		const solvedOrbits: { [key: string]: Planet } = { 'COM': root };
		let toBeProcessed = [...parsedInput];
		const processed = ['COM'];

		while(toBeProcessed.length) {
			const currentRound = toBeProcessed.filter(o => processed.includes(o.orbits));
			toBeProcessed = toBeProcessed.filter(o => !processed.includes(o.orbits))

			currentRound.forEach(a => {
				const orbit = solvedOrbits[a.orbits];
				solvedOrbits[a.name] = {
					name: a.name,
					orbits: orbit,
					chainDepth: (orbit?.chainDepth ?? 0) + 1
				};
				processed.push(a.name);
			});
		}

        return Object.values(solvedOrbits).reduce((agg, curr) => agg + curr.chainDepth, 0);
    }

    async solvePart2(input: string[]) {
        const parsedInput = input.map((i): ParsedOrbit => { 
			const [orbits, name] = i.split(')');
			return {
				name, orbits
			}
		});

		const root: Planet = {
			name: 'COM',
			chainDepth: 0,
			orbits: {} as Planet
		};

		const solvedOrbits: { [key: string]: Planet } = { 'COM': root };
		let toBeProcessed = [...parsedInput];
		const processed = ['COM'];

		while(toBeProcessed.length) {
			const currentRound = toBeProcessed.filter(o => processed.includes(o.orbits));
			toBeProcessed = toBeProcessed.filter(o => !processed.includes(o.orbits))

			currentRound.forEach(a => {
				const orbit = solvedOrbits[a.orbits];
				solvedOrbits[a.name] = {
					name: a.name,
					orbits: orbit,
					chainDepth: (orbit?.chainDepth ?? 0) + 1
				};
				processed.push(a.name);
			});
		}

		const youParents: Planet[] = [];
		let curr = solvedOrbits['YOU'];
		while(curr.name !== 'COM') {
			youParents.push(curr);
			curr = curr.orbits;
		}

		const santaParents: Planet[] = [];
		curr = solvedOrbits['SAN'];
		while(curr.name !== 'COM') {
			santaParents.push(curr);
			curr = curr.orbits;
		}

		const youReversed = youParents.reverse();
		const santaReversed = santaParents.reverse();

		let commonParent = 0;
		for(let i = 0; i<=youParents.length; i++) {
			if(youReversed[i].name !== santaReversed[i].name) {
				commonParent = i-1;
				break;
			};
		}

		const pathToCommonParent = youReversed.length - commonParent + santaReversed.length - commonParent - 4;
		return pathToCommonParent;
    }
}