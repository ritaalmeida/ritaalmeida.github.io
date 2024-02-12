import classNames from 'classnames';
import './Card.css';

interface CardProps {
  onClick?: () => void;
  selectable?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Card = ({
  onClick,
  selectable,
  children,
  isLoading = false,
}: CardProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames('card', {
        loading: isLoading,
        selectableCard: selectable,
        enlarge: !selectable && !isLoading,
        reduce: selectable && !isLoading,
      })}
    >
      {children}
    </button>
  );
};

export default Card;
