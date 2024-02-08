import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const getPokemonById = async (id: number) => {
  const data = await api.getPokemonById(id);

  return data;
};
