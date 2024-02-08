import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query samplePokeAPIquery($name: String) {
    pokemons: pokemon_v2_pokemonsprites(
      where: {
        pokemon_v2_pokemon: {
          is_default: { _eq: true }
          name: { _regex: $name }
        }
      }
    ) {
      id
      pokemon_v2_pokemon {
        name
        pokemon_v2_pokemontypes {
          type_id
        }
      }
      sprites(path: "front_default")
    }
  }
`;
