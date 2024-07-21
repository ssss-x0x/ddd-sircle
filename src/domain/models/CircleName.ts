import HashCode from 'ts-hashcode'

export class CircleName {
    private value: string;

    constructor(value: string) {
        if (!value) {
            throw new Error("CircleName is required");
        }

        if (value.length < 3) {
            throw new Error("CircleName must be at least 3 characters long");
        }

        if (value.length > 20) {
            throw new Error("CircleName must be at most 20 characters long");
        }

        this.value = value;
    }

    equals(other: CircleName): boolean {
        if (!other) return false;
        if (this === other) return true;
        return this.value === other.value;
    }

    hashCode(): number {
        return this.value !== null ? HashCode(this.value) : 0;
    }
}