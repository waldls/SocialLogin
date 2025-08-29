import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen overflow-x-auto bg-gradient-to-b from-white via-indigo-100 to-indigo-200">
      <div className="w-[640px] mx-auto min-h-screen flex flex-col items-center justify-center px-6 text-center shrink-0">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 whitespace-nowrap shrink-0">
          Welcome to <span className="text-indigo-600">TwinAuth</span>!
        </h1>

        <p className="text-lg text-gray-600 mb-10 shrink-0">
          다양한 소셜 계정으로 간편하게 로그인 해보세요!
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-[240px] h-[52px] bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition shrink-0"
        >
          로그인하러 가기 →
        </button>
      </div>
    </div>
  );
};

export default HomePage;
