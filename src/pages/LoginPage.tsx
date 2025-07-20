import google from "../assets/googlelogo.png";
import kakao from "../assets/kakaologo.svg";
import KakaoLogin from "react-kakao-login";
import { useKakaoLogin } from "../hooks/useKakaoLogin";

const LoginPage = () => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const { handleSuccess, handleFail } = useKakaoLogin();

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Social Login
      </h1>

      {/* 구글 로그인 */}
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-[20rem] h-[3.5rem] rounded-md bg-[#8cbcff] text-black font-medium text-base cursor-pointer hover:opacity-90 transition-all"
      >
        <img src={google} alt="구글 로고" className="w-5 h-5" />
        <span className="font-black">구글 로그인</span>
      </button>

      {/* 카카오 로그인 (네가 만든 스타일 유지) */}
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
  );
};

export default LoginPage;
