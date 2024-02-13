import { useQuery } from '@apollo/client';
import GET_POKEMONS from '../queries';
import { PokemonType } from '../interfaces';

interface PokemonData {
  id: number;
  sprites: string;
  pokemon_v2_pokemon: {
    name: string;
    pokemon_v2_pokemontypes: PokemonType[];
  };
}

export interface PokemonGet {
  pokemons: PokemonData[];
}

const usePokemonQuery = (searchText: string) => {
  const { data, ...queryResult } = useQuery<PokemonGet>(GET_POKEMONS, {
    variables: { name: searchText.toLowerCase() },
    skip: searchText.length < 3,
  });

  return {
    data: data?.pokemons.map((pokemon: PokemonData) => ({
      name: pokemon.pokemon_v2_pokemon.name,
      id: pokemon.id,
      sprite: pokemon.sprites,
      types: pokemon.pokemon_v2_pokemon.pokemon_v2_pokemontypes,
    })),
    ...queryResult,
  };
};

export default usePokemonQuery;
