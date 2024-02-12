import { Pokemon } from "pokenode-ts";
import classNames from "classnames";
import "./PokemonCard.css";
import { usePokemonById } from "../../hooks";
import { LoadingCard } from "../LoadingCard";
import Card from "../Card/Card";

interface PokemonCardProps {
  pokemonId: number;
  handleClick: () => void;
  className?: string;
  action?: "next" | "previous";
  slideIndex: number;
}

export const PokemonCard = ({
  pokemonId,
  handleClick,
  className,
  action,
  slideIndex,
}: PokemonCardProps) => {
  const { data: pokemon, isLoading } = usePokemonById({ id: pokemonId });

  const { id, sprites, name, types } = pokemon || {};
  const selectable = slideIndex !== 1;

  if (isLoading) {
    return <LoadingCard selectable={selectable} />;
  }

  return (
    <Card onClick={handleClick} selectable={slideIndex !== 1}>
      <img
        className={classNames("cardImage", {
          ["cardImageSelectable"]: selectable,
        })}
        src={sprites?.front_default || undefined}
        alt="Avatar"
        onClick={handleClick}
      />
      <div
        className={classNames("container", {
          ["selectableContainer"]: selectable,
        })}
      >
        <div className="title">
          <b className={classNames({ ["selectableTitle"]: selectable })}>
            {name}
          </b>
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
