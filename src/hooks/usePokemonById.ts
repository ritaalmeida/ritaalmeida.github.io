import { useQueries, useQuery } from "react-query";
import { getPokemonById } from "../api/service";

const usePokemonById = ({ id }: { id: number }) =>
  useQuery(["pokemon", id], () => getPokemonById(id));

export default usePokemonById;
