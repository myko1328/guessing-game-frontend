const SignIn = ({
  handleChange,
  formData,
  handleRegister,
}: {
  handleChange: any;
  formData: string;
  handleRegister: any;
}) => {
  return (
    <div className="bg-[#272b33] min-h-[620px] flex-1">
      <div className="flex flex-col justify-center h-full">
        <h2 className="text-center mb-20 text-[32px] font-bold">Welcome</h2>

        <p className="text-center opacity-40">Please insert your name</p>

        <div className="text-center">
          <input
            id="name"
            onChange={handleChange}
            className="w-3/4 rounded-md mt-4 h-12 px-2"
            value={formData}
          />

          <button
            onClick={handleRegister}
            className="w-3/4 bg-gradient-to-r from-rose-400 to-orange-300 rounded-md p-4 font-bold text-lg mt-6"
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
