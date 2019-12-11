class Croupier {
  constructor(
    readonly fairDice: Dice,
    readonly loadedDice: Dice,
    initDicePropability: number[],
    transitionMatrix: number[][]
  ) {}
}

const OBSERVATIONS = 300;

const fairDice = [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6];
const loadedDice = [1 / 10, 1 / 10, 1 / 10, 1 / 10, 1 / 10, 1 / 2];

const initDicePropability = [0.5, 0.5];

const transitionMatrix = [
  [0.95],
  [0.05], // Fair -> Fair 0.95, Fair -> Loaded 0.05
  [0.1, 0.9] // Loaded -> Fair 0.10, Loaded -> Loaded 0.90
];

const croupier = new Croupier(
  fairDice,
  loadedDice,
  initDicePropability,
  transitionMatrix
);
console.log({ croupier });
