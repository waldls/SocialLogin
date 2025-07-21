import google from "../assets/googlelogo.png";
import kakao from "../assets/kakaologo.svg";
import KakaoLogin from "react-kakao-login";
import { useKakaoLogin } from "../hooks/useKakaoLogin";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  const { handleSuccess, handleFail } = useKakaoLogin();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-100 to-indigo-200 flex flex-col items-center justify-center px-6 text-center gap-2">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        Social Login
      </h1>
      <p className="text-gray-600 mb-8 text-base">
        원하는 소셜 계정으로 로그인 해보세요
      </p>
      <div className="flex flex-col gap-4">
        {/* 구글 로그인 */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-[20rem] h-[3.5rem] rounded-md bg-[#006aff85] text-black font-medium text-base cursor-pointer hover:opacity-90 transition-all"
        >
          <img src={google} alt="구글 로고" className="w-5 h-5" />
          <span className="font-black">구글 로그인</span>
        </button>

        {/* 카카오 로그인 */}
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={handleSuccess}
          onFail={handleFail}
          render={({ onClick }) => (
            <button
              onClick={onClick}
              className="flex items-center justify-center gap-1 w-[20rem] h-[3.5rem] rounded-md bg-[#FEE500] text-black font-medium text-base cursor-pointer hover:opacity-90 transition-all"
            >
              <img src={kakao} alt="카카오 로고" className="w-9 h-9" />
              <span className="font-black">카카오 로그인</span>
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default LoginPage;
