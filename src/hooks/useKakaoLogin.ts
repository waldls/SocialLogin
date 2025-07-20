import { useNavigate } from "react-router-dom";

// 카카오 응답 타입 정의
type KakaoLoginResponse = {
  response: {
    access_token: string;
  };
};

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  const handleSuccess = async (res: unknown) => {
    try {
      const response = (res as KakaoLoginResponse).response;
      const accessToken = response.access_token;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);

      // 사용자 정보 요청
      const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      const data = await userRes.json();

      const profile = {
        name: data.kakao_account?.profile?.nickname ?? "알 수 없음",
        avatar: data.kakao_account?.profile?.profile_image_url ?? "",
        bio: data.kakao_account?.email ?? "카카오 유저",
      };

      // 유저 정보 저장
      localStorage.setItem("userInfo", JSON.stringify(profile));

      // 마이페이지로 이동
      setTimeout(() => {
        navigate("/mykakao");
      }, 100);
    } catch (error) {
      console.error("카카오 로그인 처리 중 오류:", error);
      navigate("/login");
    }
  };

  const handleFail = (err: unknown) => {
    console.error("❌ 카카오 로그인 실패:", err);
  };

  return { handleSuccess, handleFail };
};
