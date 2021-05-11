export class Cake {
    id: number;
    name: string;
    comment: string;
    imageUrl: string;
    yumFactor: number;

    constructor(init?: Partial<Cake>) {
        Object.assign(this, init);
    }
}