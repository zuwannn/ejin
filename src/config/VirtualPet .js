export class VirtualPet {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.energy = 100;
    }

    // Play with the pet
    play() {
        this.energy -= 10;
        this._checkStats();
    }

    // Feed the pet
    feed() {
        this.energy += 20;
        this._checkStats();
    }

    // Private method to check and limit the stats
    _checkStats() {
        if (this.energy > 100) {
            this.energy = 100;
        }

        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    // Get the pet's status
    getStatus() {
        return `${this.name} the ${this.species} - Energy: ${this.energy}`;
    }

    test() {
        console.log("test 444");
    }
}