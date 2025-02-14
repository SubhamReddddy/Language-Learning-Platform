import { useSelector } from "react-redux";
import { ReduxStateType } from "../redux/store";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const Result = () => {
  const { isLoading, data, result } = useSelector(
    (state: ReduxStateType) => state.root
  );
  const navigate = useNavigate();
  const calculateScore = () => {
    let score = 0;
    data.forEach((item, index) => {
      if (result[index] === item.meaning) {
        score++;
      }
    });
    return score;
  };
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quiz Results
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-8">
          Your Score: <span className="text-green-600">{calculateScore()}</span>{" "}
          / <span className="text-gray-600">{data.length}</span>
        </h2>
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${
                result[index] === item.meaning
                  ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-red-100 border-l-4 border-red-500"
              }`}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Q{index + 1}: What is the meaning of{" "}
                <span className="font-bold text-blue-600">{item.word}</span>?
              </h3>
              <p className="text-gray-700">
                <strong>Your Answer:</strong>{" "}
                <span
                  className={`${
                    result[index] === item.meaning
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {result[index]}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-600">{item.meaning}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
