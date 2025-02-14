import { MouseEvent } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const language: Lanopt[] = [
    { language: "Hindi", code: "hi", color: "#22c55e", hover: "#16a34a" },
    {
      language: "Chinese",
      code: "zh-Hant",
      color: "#3b82f6",
      hover: "#2563eb",
    },
    { language: "Japanese", code: "ja", color: "#eab308", hover: "#ca8a04" },
    { language: "Spanish", code: "es", color: "#ef4444", hover: "#dc2626" },
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Welcome to our Learning Platform
      </h1>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {language.map((element) => {
          return (
            <Link
              key={element.code}
              to={`/learn?lang=${element.code}`}
              className="text-white py-2 px-4 rounded text-center"
              style={{ backgroundColor: element.color }}
              onMouseOver={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = element.hover!;
              }}
              onMouseOut={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = element.color!;
              }}
            >
              {element.language}
            </Link>
          );
        })}
      </div>

      {/* Paragraph */}
      <p className="text-gray-700 text-center">Select a language to proceed.</p>
    </div>
  );
};

export default Home;
