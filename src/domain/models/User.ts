export class User {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        if (!id) {
            throw new Error("id cannot be null or undefined");
        }

        if (!name) {
            throw new Error("name cannot be null or undefined");
        }

        this.id = id;
        this.name = name;
    }
}