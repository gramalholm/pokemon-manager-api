"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPokemonRepository = void 0;
class InMemoryPokemonRepository {
    pokemons = [];
    async create(pokemon) {
        const existingIndex = this.pokemons.findIndex((p) => p.id === pokemon.id);
        if (existingIndex >= 0) {
            this.pokemons[existingIndex] = pokemon;
        }
        else {
            this.pokemons.push(pokemon);
        }
    }
    async findAll(filter) {
        let result = [...this.pokemons];
        if (filter?.type) {
            const typeFilter = filter.type.trim().toUpperCase();
            result = result.filter((p) => p.primaryType.toUpperCase() === typeFilter ||
                (p.secondaryType && p.secondaryType.toUpperCase() === typeFilter));
        }
        if (filter?.name) {
            const nameFilter = filter.name.trim().toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(nameFilter));
        }
        return result;
    }
    async findById(id) {
        return this.pokemons.find((p) => p.id === id) ?? null;
    }
    async findByName(name) {
        const cleanName = name.trim().toLowerCase();
        return (this.pokemons.find((p) => p.name.toLowerCase() === cleanName) ?? null);
    }
    async update(pokemon) {
        const index = this.pokemons.findIndex((p) => p.id === pokemon.id);
        if (index >= 0) {
            this.pokemons[index] = pokemon;
        }
    }
    async delete(id) {
        this.pokemons = this.pokemons.filter((p) => p.id !== id);
    }
}
exports.InMemoryPokemonRepository = InMemoryPokemonRepository;
