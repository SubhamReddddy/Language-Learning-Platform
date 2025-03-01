import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReduxStateType } from "../redux/store";

const TaskReview = () => {
  const { id } = useParams();
  const { carrier } = useSelector((state: ReduxStateType) => state);
  const testData = carrier[Number(id)];

  // Check if data is available
  if (!testData || !testData.task || !testData.ans) {
    return (
      <div className="mt-20 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Loading data...</h2>
        <p className="text-gray-500 mt-2">
          If this persists, the test data might not be available.
        </p>
      </div>
    );
  }

  const { task, ans } = testData;

  // Calculate correct answers
  const correctCount = task.reduce((count, item, index) => {
    return count + (item.meaning === ans[index] ? 1 : 0);
  }, 0);

  // Calculate percentage
  const percentage = Math.round((correctCount / task.length) * 100);

  return (
    <div className="mt-20 bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Test Results
      </h1>

      {/* Summary Section */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-700">
              Total Questions:{" "}
              <span className="font-semibold">{task.length}</span>
            </p>
            <p className="text-gray-700">
              Correct Answers:{" "}
              <span className="font-semibold">{correctCount}</span>
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 text-blue-800">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Score</p>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-gray-700 font-semibold border">
                #
              </th>
              <th className="p-3 text-left text-gray-700 font-semibold border">
                English Word
              </th>
              <th className="p-3 text-left text-gray-700 font-semibold border">
                Correct Meaning
              </th>
              <th className="p-3 text-left text-gray-700 font-semibold border">
                Your Answer
              </th>
              <th className="p-3 text-center text-gray-700 font-semibold border">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {task.map((item, index) => {
              const isCorrect = item.meaning === ans[index];
              return (
                <tr
                  key={item._id}
                  className={isCorrect ? "bg-green-50" : "bg-red-50"}
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border font-medium">{item.word}</td>
                  <td className="p-3 border">{item.meaning}</td>
                  <td className="p-3 border">{ans[index]}</td>
                  <td className="p-3 border text-center">
                    {isCorrect ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-200 text-green-800">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-200 text-red-800">
                        ✗
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskReview;
