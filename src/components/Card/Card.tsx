import classNames from 'classnames';
import './Card.css';

interface CardProps {
  onClick?: () => void;
  selectable?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  hide?: boolean;
}

export const Card = ({
  onClick,
  selectable,
  children,
  isLoading = false,
  hide = false,
}: CardProps) => (
  <button
    onClick={onClick}
    type="button"
    className={classNames('card', {
      loading: isLoading,
      selectableCard: selectable,
      enlarge: !selectable && !isLoading,
      reduce: selectable && !isLoading,
      hideCard: hide,
    })}
    disabled={!selectable}
  >
    {children}
  </button>
);

export default Card;
