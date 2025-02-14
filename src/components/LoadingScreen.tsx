const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-red-500 border-solid rounded-full animate-spin [animation-duration:1.5s]"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-green-500 border-solid rounded-full animate-spin [animation-duration:2s]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
