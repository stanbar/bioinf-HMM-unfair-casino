function weightedRandom(propabilities: number[]): number {
  let offset = 0.0;
  const randomValue = Math.random();
  for (const [i, prob] of propabilities.entries()) {
    offset += prob;
    if (offset > randomValue) {
      return i; // Return the dice value (index)
    }
  }

  return propabilities.length - 1; // fallback to last value (index)
}
class Dice {
  constructor(readonly propabilities: number[]) {}

  getNextValue(): number {
    return weightedRandom(this.propabilities);
  }
}

enum DiceType {
  Fair,
  Loaded
}

class Croupier {
  currentDice: number;

  constructor(
    readonly fairDice: Dice,
    readonly loadedDice: Dice,
    readonly initDicePropability: number[],
    readonly transitionMatrix: number[][]
  ) {
    this.currentDice = weightedRandom(initDicePropability);
  }

  getNextValue(): [number, number] {
    // Try to switch between dices
    this.currentDice = weightedRandom(transitionMatrix[this.currentDice]);

    // Let's roll the dice!
    if (this.currentDice == DiceType.Fair) {
      return [this.currentDice, this.fairDice.getNextValue()];
    } else if (this.currentDice == DiceType.Loaded) {
      return [this.currentDice, this.loadedDice.getNextValue()];
    } else {
      throw Error("Unsupported dice type");
    }
  }

  getObservations(observationsLength: number): Array<[number, number]> {
    return Array.from({ length: observationsLength }, () =>
      this.getNextValue()
    );
  }
}

const fairDice = new Dice([1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6]);
const loadedDice = new Dice([0.1, 0.1, 0.1, 0.1, 0.1, 0.5]);

const initDicePropability = [0.5, 0.5];

const transitionMatrix = [
  [0.95, 0.05], // Fair -> Fair 0.95, Fair -> Loaded 0.05
  [0.1, 0.9] // Loaded -> Fair 0.10, Loaded -> Loaded 0.90
];

const croupier = new Croupier(
  fairDice,
  loadedDice,
  initDicePropability,
  transitionMatrix
);

const observations = croupier.getObservations(30);
console.log(observations);
