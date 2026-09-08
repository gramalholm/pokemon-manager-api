//Usando props para seguir o DDD
export interface PokemonProps{
    id: string;
    name: string;
    type: string;
    hp: number;
}

export class Pokemon{
    private props: PokemonProps;

    constructor(props: PokemonProps){
        if(props.hp <= 0){
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