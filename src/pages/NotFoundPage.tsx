import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-screen overflow-x-auto bg-gradient-to-b from-white via-indigo-100 to-indigo-200 flex items-center justify-center">
      <div className="w-[560px] flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <h1 className="text-[8rem] font-extrabold text-indigo-600 drop-shadow-lg select-none whitespace-nowrap">
            404
          </h1>
          <span className="absolute inset-0 blur-3xl bg-indigo-300/40 rounded-full animate-pulse -z-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 whitespace-nowrap">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-500 whitespace-nowrap">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br /> 잠시 후 다시 시도해보세요!
        </p>
        <Link
          to="/"
          className="mt-4 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition-all duration-300 whitespace-nowrap"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
