import { useDispatch, useSelector } from "react-redux";
import { ReduxStateType } from "../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import LoadingScreen from "./LoadingScreen";
import { setResultInRedux } from "../redux/slice";

const Quiz = () => {
  const { isLoading, data } = useSelector(
    (state: ReduxStateType) => state.root
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);
  const [currentAns, setCurrentAns] = useState<string>("");
  const [_, setResult] = useState<Array<string>>([]);

  function handler() {
    setResult((prev) => {
      const temp = [...prev];
      temp[count] = currentAns;
      dispatch(setResultInRedux(temp));
      return temp;
    });
    history.replaceState(null, "", "/");
    navigate("/result");
  }

  useEffect(() => {
    if (!data || data.length === 0) {
      navigate("/");
    }
  }, [data, navigate]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center mt-9">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative">
        <button
          className="flex items-center text-white bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-lg mb-8 absolute top-6 left-3"
          onClick={() => {
            count > 0 ? setCount((prev) => prev - 1) : navigate("/");
          }}
        >
          <FiArrowLeft className="text-2xl" />
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Quiz Time!
        </h1>
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          What is the meaning of {data[count]?.word}
        </h2>
        <form className="space-y-4">
          {data[count]?.options.map((answer, index) => (
            <label
              key={index}
              className="block bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg px-4 py-3 transition duration-200 shadow-sm"
              style={{
                backgroundColor: answer === currentAns ? "green" : "#f3f4f6",
              }}
            >
              <input
                type="radio"
                name="answer"
                value={answer}
                className="hidden"
                checked={answer === currentAns}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCurrentAns(e.target.value);
                }}
              />
              <span
                className="text-gray-800 font-medium"
                style={{ color: answer === currentAns ? "white" : "black" }}
              >
                {answer}
              </span>
            </label>
          ))}
        </form>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:text-gray-500"
            disabled={currentAns ? false : true}
            onClick={() => {
              count < data.length - 1
                ? setCount((prev) => {
                    setResult((pre) => {
                      const temp = [...pre];
                      temp[count] = currentAns;
                      return temp;
                    });
                    return prev + 1;
                  })
                : handler();
              setCurrentAns("");
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
