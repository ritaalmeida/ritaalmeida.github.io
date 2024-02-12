import { useEffect, useState } from "react";
import { usePokemonById, usePokemonQuery } from "../../hooks";
import { SearchList } from "../SearchList";
import { PokemonCard } from "../PokemonCard";
import { LoadingCard } from "../LoadingCard";
import logo from "../../assets/logo.png";
import "./Pokedex.css";
import { v4 as uuidv4 } from "uuid";

export const Pokedex = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<number>();
  const [requestIds, setRequestIds] = useState<number[]>([]);
  const [action, setAction] = useState<"previous" | "next">();

  const { data } = usePokemonQuery(searchText);

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

  const handleClick = (index: number) => {
    const action = index === 0 ? "previous" : "next";
    if (index !== 1) setAction(action);

    if (action?.length) {
      if (action === "next") {
        setSelectedPokemon((selectedPokemon as number) + 1);
      } else {
        setSelectedPokemon((selectedPokemon as number) - 1);
      }
    }
  };

  return (
    <div className="pokedex">
      <div className="search">
        <img src={logo} className="logo" alt="pokemon" />
        <SearchList
          searchText={searchText}
          setSearchText={setSearchText}
          pokemons={data}
          handleSelectPokemon={handleSelectPokemon}
        />
        <div className="pokemonsSection">
          {requestIds &&
            requestIds.map((id, index) => (
              <PokemonCard
                pokemonId={id}
                slideIndex={index}
                handleClick={() => handleClick(index)}
                action={action}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
