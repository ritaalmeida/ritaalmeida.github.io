import { useQuery } from 'react-query';
import { Pokemon } from 'pokenode-ts';
import { AxiosError } from 'axios';
import { getPokemonById } from '../api/service';

const usePokemonById = ({ id }: { id: number }) =>
  useQuery<Pokemon, AxiosError>(['pokemon', id], () => getPokemonById(id));

export default usePokemonById;
