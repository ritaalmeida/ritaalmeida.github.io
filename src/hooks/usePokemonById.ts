import { useQueries } from "react-query";
import { getPokemonById } from "../api/service";

const usePokemonById = ({ ids }: { ids: number[] }) => {
  const results = useQueries(
    ids?.map((id) => ({
      queryKey: ["pokemon", id],
      queryFn: () => getPokemonById(id),
    }))
  );

  return results;
};

export default usePokemonById;
