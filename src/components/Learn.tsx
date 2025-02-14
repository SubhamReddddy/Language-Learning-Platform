import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiVolume2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { audioFatch, translateFunction } from "../helpers/helper.ts";
import { useDispatch, useSelector } from "react-redux";
import { setData, loading } from "../redux/slice.ts";
import { ReduxStateType } from "../redux/store.ts";
import LoadingScreen from "./LoadingScreen.tsx";

const Learn = () => {
  const { isLoading, data } = useSelector(
    (state: ReduxStateType) => state.root
  );
  const [count, setCount] = useState<number>(0);
  const [query] = useSearchParams();
  const code = query.get("lang");
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading());
    const response: Promise<responseType[]> = translateFunction(code as cod);
    response
      .then((data) => {
        console.log(data);
        dispatch(setData(data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [code, translateFunction, dispatch, setData]);

  const audioHandler = () => {
    if (audioSrc) {
      audioRef.current?.play();
    } else {
      audioFatch(data[count]?.meaning, code as cod)
        .then((audio) => {
          setAudioSrc(audio);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      <button
        className="flex items-center text-white bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-lg mb-6 sm:mb-8"
        onClick={() => {
          count > 0
            ? setCount((prev) => {
                setAudioSrc("");
                return prev - 1;
              })
            : navigate("/");
        }}
      >
        <FiArrowLeft className="text-xl sm:text-2xl" />
      </button>

      {/* Word and Audio Icon */}
      <div className="bg-white text-gray-800 rounded-lg shadow-lg px-6 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8 w-full max-w-lg">
        <span className="text-2xl sm:text-3xl font-bold">{count + 1} -</span>
        <span className="text-2xl sm:text-3xl font-bold">
          {data[count]?.word} :
        </span>
        <span className="text-2xl sm:text-3xl font-bold">
          {data[count]?.meaning}
        </span>
        <button
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-lg"
          onClick={audioHandler}
        >
          <FiVolume2 className="text-xl sm:text-2xl" />
          {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
        </button>
      </div>

      {/* Next Button */}
      <button
        className="text-white bg-green-500 hover:bg-green-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg text-base sm:text-lg"
        onClick={() => {
          count < data.length - 1
            ? setCount((prev) => {
                setAudioSrc("");
                return prev + 1;
              })
            : navigate("/quiz");
        }}
      >
        {count < data.length - 1 ? "Next" : "Quiz"}
      </button>
    </div>
  );
};

export default Learn;
