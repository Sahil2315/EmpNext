const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 rounded-lg flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur">
      <div className="w-18 h-18 border-6 border-gray-500 border-t-indigo-700 rounded-full animate-spin"></div>
      <span className="text-lg mt-4 text-indigo-500/70">Please Wait while we Verify your Token</span>
    </div>
  );
};

export default Loader;
