import classNames from 'classnames';
import './PokemonCard.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePokemonById } from '../../hooks';
import LoadingCard from '../LoadingCard';
import Card from '../Card';

interface PokemonCardProps {
  pokemonId: number;
  handleClick: () => void;
  slideIndex: number;
}

export const PokemonCard = ({
  pokemonId,
  handleClick,
  slideIndex,
}: PokemonCardProps) => {
  const { data: pokemon, isLoading, error } = usePokemonById({ id: pokemonId });

  useEffect(() => {
    if (error && error.response?.status !== 404) {
      toast.error('Something went wrong, please try again in a few minutes!', {
        position: 'bottom-right',
        toastId: 'error',
      });
    }
  }, [error]);

  const { id, sprites, name, types } = pokemon || {};
  const selectable = slideIndex !== 1;

  if (isLoading) {
    return <LoadingCard selectable={selectable} />;
  }

  return (
    <Card
      onClick={handleClick}
      selectable={slideIndex !== 1}
      hide={error?.response?.status === 404}
    >
      <img
        className={classNames('cardImage', {
          cardImageSelectable: selectable,
        })}
        src={sprites?.front_default || undefined}
        alt="Avatar"
      />
      <div
        className={classNames('container', {
          selectableContainer: selectable,
        })}
      >
        <div className="title">
          <b className={classNames({ selectableTitle: selectable })}>{name}</b>
          <span className="pokemonInfo">{`#${id}`}</span>
        </div>
        {!selectable && (
          <div className="abilities">
            {(types || []).map(({ type }) => (
              <div key={`${name}-type-${type.name}`} className="pokemonType">
                <span>{type.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PokemonCard;
