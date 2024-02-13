import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePokemonQuery } from '../../hooks';
import SearchList from '../SearchList';
import PokemonCard from '../PokemonCard';
import logo from '../../assets/logo.png';
import './Pokedex.css';
import 'react-toastify/dist/ReactToastify.css';

export const Pokedex = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<number>();
  const [requestIds, setRequestIds] = useState<number[]>([]);

  const { data, error } = usePokemonQuery(searchText);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong, please try again in a few minutes!', {
        position: 'bottom-right',
        toastId: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (selectedPokemon) {
      const previousId = selectedPokemon - 1;
      const nextId = selectedPokemon + 1;

      setRequestIds([previousId, selectedPokemon, nextId]);
    }
  }, [selectedPokemon]);

  const handleSelectPokemon = (id: number) => {
    setSearchText('');
    setSelectedPokemon(id);
  };

  const handleClick = (index: number) => {
    const action = index === 0 ? 'previous' : 'next';

    const newSelectedPokemonId =
      action === 'next'
        ? (selectedPokemon as number) + 1
        : (selectedPokemon as number) - 1;

    setSelectedPokemon(newSelectedPokemonId);
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
      <ToastContainer />
    </div>
  );
};

export default Pokedex;
