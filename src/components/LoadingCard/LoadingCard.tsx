import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import "./LoadingCard.css";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../Card/Card";

export const LoadingCard = ({ selectable }: { selectable: boolean }) => (
  <Card selectable={selectable} isLoading>
    <Skeleton borderRadius={15} containerClassName="imageLoader" />
    <div className="containerLoader">
      <Skeleton containerClassName="titleLoader" />
      {!selectable && <Skeleton width={50} />}
    </div>
  </Card>
);
