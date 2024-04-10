const ButtonLayout = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name?: string;
}) => {
  return (
    <div className="bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 ">
      <span className="flex justify-center opacity-80 text-sm font-semibold">
        {name}
      </span>
      <div className="gap-4 flex">{children}</div>
    </div>
  );
};

export default ButtonLayout;
