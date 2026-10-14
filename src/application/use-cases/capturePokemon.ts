import { randomUUID } from 'crypto';
import { Capture } from '@domain/entities/capture';
import { Pokemon } from '@domain/entities/pokemon';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { ICaptureRepository } from '@domain/repositories/capture.repository';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';
import { IPokeApiGateway } from '@application/gateways/pokeapi.gateway';
import { NotFoundError } from '@domain/errors/NotFoundError';
import { MaxTeamSizeError } from '@domain/errors/MaxTeamSizeError';
import { CapturePokemonDTO } from '@application/dtos/capturePokemonDTO';

export class CapturePokemonUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private captureRepository: ICaptureRepository,
    private pokemonRepository: IPokemonRepository,
    private pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute(trainerId: string, data: CapturePokemonDTO): Promise<Capture> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new NotFoundError(trainerId, 'Treinador');
    }

    const currentCount =
      await this.captureRepository.countByTrainerId(trainerId);
    if (currentCount >= 6) {
      throw new MaxTeamSizeError(trainerId);
    }

    // Busca dados reais na PokéAPI oficial
    const pokeApiData = await this.pokeApiGateway.searchPokemon(
      data.pokemonName,
    );

    // Constrói ou sincroniza o Pokémon no catálogo local
    const pokemon = new Pokemon({
      id: pokeApiData.id,
      name: pokeApiData.name,
      primaryType: pokeApiData.primaryType,
      secondaryType: pokeApiData.secondaryType,
      hp: pokeApiData.hp,
      attack: pokeApiData.attack,
      defense: pokeApiData.defense,
      speed: pokeApiData.speed,
      height: pokeApiData.height,
      weight: pokeApiData.weight,
    });

    await this.pokemonRepository.create(pokemon);

    // Sorteio de shiny (5% de chance) se não especificado
    const isShiny =
      typeof data.isShiny === 'boolean' ? data.isShiny : Math.random() < 0.05;

    const capture = new Capture({
      id: randomUUID(),
      trainerId,
      pokemonId: pokemon.id,
      nickname: data.nickname,
      level: data.level ?? 5,
      isShiny,
      capturedAt: new Date(),
      pokemon,
    });

    await this.captureRepository.create(capture);

    return capture;
  }
}
