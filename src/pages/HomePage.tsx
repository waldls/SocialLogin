import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-100 to-indigo-200 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Welcome to <span className="text-indigo-600">Social Login</span> Demo
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        다양한 소셜 계정으로 간편하게 로그인해보세요.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
      >
        로그인하러 가기 →
      </button>
    </div>
  );
};

export default HomePage;
