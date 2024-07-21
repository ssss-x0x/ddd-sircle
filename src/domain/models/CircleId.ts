export class CircleId {
    public value: string;

    constructor(value: string) {
        if (!value) {
            throw new Error("CircleId is required");
        }

        this.value = value;
    }
}