import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./SearchList.css";
import { Pokemon } from "../../interfaces";

interface SearchListProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  pokemons?: Pokemon[];
  handleSelectPokemon: (id: number) => void;
}

export const SearchList = ({
  searchText,
  setSearchText,
  pokemons,
  handleSelectPokemon,
}: SearchListProps) => {
  const [, setDebouncedInputValue] = useState("");

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(searchText);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchText]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        className="searchInput"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search for pokemons"
        title="Type in a name"
      />
      <ul className="list">
        {pokemons?.map((pokemon: Pokemon) => (
          <li key={`pokemon-${pokemon.id}`}>
            <div
              role="menuitem"
              onClick={() => handleSelectPokemon(pokemon.id)}
            >
              <div className="pokemonItem">
                <span>{pokemon.name}</span>
                <span className="pokemonInfo">{`#${pokemon.id}`}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
