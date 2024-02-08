import classNames from "classnames";
import Skeleton from "react-loading-skeleton";

export const LoadingCard = ({ small }: { small: boolean }) => (
  <div className={classNames("card", { ["smallCard"]: small })}>
    <Skeleton height={small ? 145 : 200} borderRadius={15} />
    <div className="container">
      <Skeleton />
      {!small && <Skeleton width={50} />}
    </div>
  </div>
);
