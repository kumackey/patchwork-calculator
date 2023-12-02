export class Patch {
    shape: PatchShape;
    buttonCost: number;
    timeCost: number;
    buttonsEarned: number;

    size: number;
    name: string;

    constructor(shape: PatchShape, buttonCost: number, timeCost: number, buttonsEarned: number) {
        this.shape = shape;
        this.buttonCost = buttonCost;
        this.timeCost = timeCost;
        this.buttonsEarned = buttonsEarned;

        // calculate in advance
        this.size = this.calculateSize();
        this.name = this.generateName();
    }

    private calculateSize(): number {
        return this.shape.reduce((sum, row) => sum + row.filter(cell => cell).length, 0);
    }

    private generateName(): string {
        return `${this.buttonCost}-${this.timeCost}(${this.size})+${this.buttonsEarned}`;
    }

    public totalScores(remainingIncomeTimes: RemainingIncomeTimes): number {
        return this.buttonsEarned * remainingIncomeTimes + 2 * this.size;
    }

    public buttonRate(remainingIncomeTimes: RemainingIncomeTimes): number {
        return this.totalScores(remainingIncomeTimes) / (this.buttonCost + this.timeCost);
    }

    public timeRate(remainingIncomeTimes: RemainingIncomeTimes): number {
        return (this.totalScores(remainingIncomeTimes) - this.buttonCost) / this.timeCost;
    }
}

export type PatchShape = [
    [boolean, boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean, boolean]
];

export type RemainingIncomeTimes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function defaultPatches(defaultRemainingIncomeTimes: RemainingIncomeTimes): Patch[] {
    return Patches.sort((a: Patch, b: Patch) => {
        const buttonRateDiff = b.buttonRate(defaultRemainingIncomeTimes) - a.buttonRate(defaultRemainingIncomeTimes);
        if (buttonRateDiff !== 0) {
            return buttonRateDiff;
        }
        return b.timeRate(defaultRemainingIncomeTimes) - a.timeRate(defaultRemainingIncomeTimes);
    });
}

const Patches: Patch[] = [
    new Patch([
        [true, false, false, false, false],
        [true, true, true, true, false],
        [false, false, false, true, false],
    ], 1, 2, 0),
    new Patch([
        [false, true, false, false, false],
        [true, true, true, true, false],
        [false, false, true, false, false],
    ], 2, 1, 0),
    new Patch([
        [true, true, true, true, true],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ], 7, 1, 1),
    new Patch([
        [true, false, false, false, false],
        [true, true, true, true, false],
        [true, false, false, false, false],
    ], 7, 2, 2),
    new Patch([
        [false, true, true, false, false],
        [true, true, true, true, false],
        [false, true, true, false, false],
    ], 5, 3, 1),
    new Patch([
        [false, true, false, false, false],
        [true, true, true, true, false],
        [false, true, false, false, false],
    ], 0, 3, 1),
    new Patch([
        [true, true, false, false, false],
        [false, true, true, false, false],
        [false, false, false, false, false],
    ], 3, 2, 1),
    new Patch([
        [false, false, true, false, false],
        [true, true, true, true, true],
        [false, false, true, false, false],
    ], 1, 4, 1),
    new Patch([
        [true, true, true, false, false],
        [true, false, true, false, false],
        [false, false, false, false, false],
    ], 1, 2, 0),
    new Patch([
        [true, true, true, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ], 4, 2, 1),
    new Patch([
        [true, true, true, false, false],
        [false, false, true, true, false],
        [false, false, false, false, false],
    ], 2, 3, 1),
    new Patch([
        [true, true, true, false, false],
        [false, true, false, false, false],
        [true, true, true, false, false],
    ], 2, 3, 0),
    new Patch([
        [true, true, true, false, false],
        [true, true, false, false, false],
        [false, false, false, false, false],
    ], 2, 2, 0),
    new Patch([
        [true, true, true, false, false],
        [false, true, true, true, false],
        [false, false, false, false, false],
    ], 4, 2, 0),
    new Patch([
        [false, true, false, false, false],
        [true, true, true, false, false],
        [false, true, false, false, false],
    ], 5, 4, 2),
    new Patch([
        [true, true, true, true, false],
        [false, true, true, false, false],
        [false, false, false, false, false],
    ], 7, 4, 2),
    new Patch([
        [true, true, false, false, false],
        [false, true, true, false, false],
        [false, false, true, false, false],
    ], 10, 4, 3),
    new Patch([
        [true, true, true, true, false],
        [true, true, false, false, false],
        [false, false, false, false, false],
    ], 10, 5, 3),
    new Patch([
        [true, true, true, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ], 3, 3, 1),
    new Patch([
        [true, true, true, true, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ], 10, 3, 2),
    new Patch([
        [true, true, true, true, false],
        [true, false, false, true, false],
        [false, false, false, false, false],
    ], 1, 5, 1),
    new Patch([
        [true, false, true, false, false],
        [true, true, true, false, false],
        [false, true, false, false, false],
    ], 3, 6, 2),
    new Patch([
        [true, true, false, false, false],
        [true, true, true, false, false],
        [false, false, true, false, false],
    ], 8, 6, 3),
    new Patch([
        [true, true, true, false, false],
        [false, true, false, false, false],
        [false, true, false, false, false],
    ], 5, 5, 2),
    new Patch([
        [true, true, true, true, false],
        [false, true, false, false, false],
        [false, false, false, false, false],
    ], 3, 4, 1),
    new Patch([
        [true, true, true, false, false],
        [false, true, false, false, false],
        [false, false, false, false, false],
    ], 2, 2, 0),
    new Patch([
        [true, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ], 3, 1, 0),
    new Patch([
        [true, true, false, false, false],
        [false, true, true, false, false],
        [false, false, false, false, false],
    ], 7, 6, 3),
    new Patch([
        [true, true, false, false, false],
        [true, true, false, false, false],
        [false, false, false, false, false],
    ], 6, 5, 2),
    new Patch([
        [true, true, true, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ], 4, 6, 2),
    new Patch([
        [true, true, true, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ], 2, 2, 0),
    new Patch([
        [true, true, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ], 2, 1, 0),
    new Patch([
        [true, true, false, false, false],
        [true, false, false, false, false],
        [false, false, false, false, false],
    ], 1, 3, 0),
];