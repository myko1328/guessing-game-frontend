import { FaRankingStar } from "react-icons/fa6";

const Title = ({ icon, name }: { icon?: React.ReactNode; name: string }) => {
  return (
    <div className="flex gap-4">
      {icon}
      <h3 className="text-lg font-bold">{name}</h3>
    </div>
  );
};

export default Title;
