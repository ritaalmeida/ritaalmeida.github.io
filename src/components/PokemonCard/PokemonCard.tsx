import { Pokemon } from "pokenode-ts";
import classNames from "classnames";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon?: Pokemon;
  selectable: boolean;
  handleClick: () => void;
}

export const PokemonCard = ({
  pokemon,
  selectable,
  handleClick,
}: PokemonCardProps) => {
  const { id, sprites, name, types } = pokemon || {};

  return (
    <div role="presentation" onClick={handleClick}>
      <div className={classNames("card", { ["selectableCard"]: selectable })}>
        <img
          width={selectable ? 145 : 200}
          height={selectable ? 145 : 200}
          src={sprites?.front_default || undefined}
          alt="Avatar"
          onClick={handleClick}
        />
        <div className="container">
          <div className="title">
            <b className={classNames({ ["selectableTitle"]: selectable })}>
              {name}
            </b>
            <span className="pokemonInfo">{`#${id}`}</span>
          </div>
          {!selectable && (
            <div className="abilities">
              {(types || []).map(({ type }) => (
                <div className="pokemonType">
                  <span key={`${name}-type-${type.name}`}>{type.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
