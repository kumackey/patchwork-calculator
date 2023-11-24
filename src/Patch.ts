export class Patch {
    size: number;
    buttonCost: number;
    timeCost: number;
    buttonsEarned: number;
    image: string;

    constructor(size: number, buttonCost: number, timeCost: number, buttonsEarned: number, image: string) {
        this.size = size;
        this.buttonCost = buttonCost;
        this.timeCost = timeCost;
        this.buttonsEarned = buttonsEarned;
        this.image = image;
    }

    public name() {
        return `${this.buttonCost}-${this.timeCost}(${this.size})+${this.buttonsEarned}`;
    }

    public totalScores(remaining_income_times: number): number {
        return this.buttonsEarned * remaining_income_times + 2 * this.size;
    }

    public buttonRate(remaining_income_times: number): number {
        return this.totalScores(remaining_income_times) / (this.buttonCost + this.timeCost);
    }

    public timeRate(remaining_income_times: number): number {
        return (this.totalScores(remaining_income_times) - this.buttonCost) / this.timeCost;
    }
}

export const Patches: Patch[] = [
    new Patch(6, 2, 1, 0, 'patches/28.png'),
    new Patch(5, 7, 1, 1, 'patches/15.png'),
    new Patch(6, 7, 2, 2, 'patches/06.png'),
    new Patch(6, 1, 2, 0, 'patches/03.png'),
    new Patch(8, 5, 3, 1, 'patches/25.png'),
    new Patch(5, 0, 3, 1, 'patches/19.png'),
    new Patch(4, 3, 2, 1, 'patches/26.png'),
    new Patch(7, 1, 4, 1, ''),
    new Patch(5, 1, 2, 0, ''),
    new Patch(4, 4, 2, 1, ''),
    new Patch(5, 2, 3, 1, ''),
    new Patch(7, 2, 3, 0, ''),
    new Patch(5, 2, 2, 0, ''),
    new Patch(6, 4, 2, 0, ''),
    new Patch(5, 5, 4, 2, ''),
    new Patch(6, 7, 4, 2, ''),
    new Patch(5, 10, 4, 3, ''),
    new Patch(6, 10, 5, 3, ''),
    new Patch(4, 3, 3, 1, ''),
    new Patch(5, 10, 3, 2, ''),
    new Patch(6, 1, 5, 1, ''),
    new Patch(6, 3, 6, 2, ''),
    new Patch(6, 8, 6, 3, ''),
    new Patch(5, 5, 5, 2, ''),
    new Patch(5, 3, 4, 1, ''),
    new Patch(4, 2, 2, 0, ''),
    new Patch(3, 3, 1, 0, ''),
    new Patch(4, 7, 6, 3, ''),
    new Patch(4, 6, 5, 2, ''),
    new Patch(4, 4, 6, 2, ''),
    new Patch(3, 2, 2, 0, ''),
    new Patch(2, 2, 1, 0, ''),
    new Patch(3, 1, 3, 0, '')
];