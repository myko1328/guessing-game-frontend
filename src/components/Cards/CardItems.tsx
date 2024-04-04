import { CardItem } from "./types";

const CardItems = ({ title, icon }: CardItem) => {
  return (
    <>
      {icon}

      <p className="my-auto">{title}</p>
    </>
  );
};

export default CardItems;
