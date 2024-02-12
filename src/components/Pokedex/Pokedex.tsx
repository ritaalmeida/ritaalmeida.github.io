import { useEffect, useState } from 'react';
import { usePokemonQuery } from '../../hooks';
import SearchList from '../SearchList';
import PokemonCard from '../PokemonCard';
import logo from '../../assets/logo.png';
import './Pokedex.css';

export const Pokedex = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<number>();
  const [requestIds, setRequestIds] = useState<number[]>([]);

  const { data } = usePokemonQuery(searchText);

  const handleSelectPokemon = (id: number) => {
    setSearchText('');
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
    const action = index === 0 ? 'previous' : 'next';

    if (index !== 1) {
      if (action === 'next') {
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
                key={id}
                pokemonId={id}
                slideIndex={index}
                handleClick={() => handleClick(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
