"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
class Pokemon {
    props;
    constructor(props) {
        if (props.hp <= 0) {
            throw new Error("O HP do Pokémon deve ser maior que zero.");
        }
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get type() {
        return this.props.type;
    }
    get hp() {
        return this.props.hp;
    }
}
exports.Pokemon = Pokemon;
