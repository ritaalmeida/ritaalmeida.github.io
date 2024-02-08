import { useEffect, useState } from "react";
import { usePokemonById, usePokemonQuery } from "../../hooks";
import { SearchList } from "../SearchList";
import { PokemonCard } from "../PokemonCard";
import { LoadingCard } from "../LoadingCard";
import logo from "../../assets/logo.png";
import "./Pokedex.css";

export const Pokedex = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<number>();
  const [requestIds, setRequestIds] = useState<number[]>([]);

  const { data } = usePokemonQuery(searchText);

  const pokemons = usePokemonById({ ids: requestIds });

  const handleSelectPokemon = (id: number) => {
    setSearchText("");
    setSelectedPokemon(id);
  };

  useEffect(() => {
    if (selectedPokemon) {
      const previousId = selectedPokemon - 1;
      const nextId = selectedPokemon + 1;

      setRequestIds([previousId, selectedPokemon, nextId]);
    }
  }, [selectedPokemon]);

  const handleClick = (action: string) => {
    if (action === "next") {
      setSelectedPokemon((selectedPokemon as number) + 1);
    } else {
      setSelectedPokemon((selectedPokemon as number) - 1);
    }
  };

  return (
    <div className="pokedex">
      <img src={logo} className="logo" alt="pokemon" />
      <SearchList
        searchText={searchText}
        setSearchText={setSearchText}
        pokemons={data}
        handleSelectPokemon={handleSelectPokemon}
      />
      <div className="pokemonsSection">
        {pokemons &&
          pokemons.map(({ data, status }, index) =>
            status !== "success" ? (
              <LoadingCard small={index !== 1} />
            ) : (
              <PokemonCard
                pokemon={data}
                selectable={index !== 1}
                handleClick={() =>
                  handleClick(index === 0 ? "previous" : "next")
                }
              />
            )
          )}
      </div>
    </div>
  );
};
