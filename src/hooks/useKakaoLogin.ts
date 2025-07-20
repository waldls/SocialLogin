import { useNavigate } from "react-router-dom";

// 카카오 응답 타입 정의
type KakaoLoginResponse = {
  response: {
    accessToken: string;
  };
};

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  // 카카오 로그인 성공 시 호출되는 함수
  const handleSuccess = async (res: unknown) => {
    try {
      // 응답 객체에서 accesstoken 호출
      const response = (res as KakaoLoginResponse).response;
      const accessToken = response.accessToken;

      // accessToken을 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);

      // 카카오 API를 통해 사용자 정보 요청
      const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      // 응답 데이터를 JSON 형태로 파싱
      const data = await userRes.json();

      // 사용자 프로필 정보 추출
      const profile = {
        name: data.kakao_account?.profile?.nickname ?? "알 수 없음",
        avatar: data.kakao_account?.profile?.profile_image_url ?? "",
        bio: data.kakao_account?.email ?? "카카오 유저",
      };

      // 사용자 정보 localStorage에 저장
      localStorage.setItem("userInfo", JSON.stringify(profile));

      // 마이페이지로 이동
      setTimeout(() => {
        navigate("/mykakao");
      }, 100);
    } catch (error) {
      // 에러 발생 시 로그인 페이지로 이동
      console.error("카카오 로그인 처리 중 오류:", error);
      navigate("/login");
    }
  };

  // 카카오 로그인 실패 시 호출되는 함수
  const handleFail = (err: unknown) => {
    console.error("❌ 카카오 로그인 실패:", err);
  };

  return { handleSuccess, handleFail };
};
