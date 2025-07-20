import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();

  // 커스텀 훅을 통해 accessToken 저장 함수 호출
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  // refreshToken 저장 함수 호출
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    // 현재 URL의 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // accessToken과 refreshToken이 모두 존재할 경우 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 약간의 딜레이 후 /mygoogle 페이지로 이동 (스토리지 저장 안정성 확보 목적)
      setTimeout(() => {
        navigate("/mygoogle");
      }, 100);
    } else {
      // 둘 중 하나라도 없으면 로그인 페이지로 이동
      navigate("/login");
    }
  }, [navigate, setAccessToken, setRefreshToken]);

  return (
    <div className="text-center mt-10 text-lg">로그인 처리 중입니다...</div>
  );
};

export default GoogleLoginRedirectPage;
