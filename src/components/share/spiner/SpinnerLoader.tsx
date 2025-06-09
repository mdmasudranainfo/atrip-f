const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full  mb-5">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default SpinnerLoader;
