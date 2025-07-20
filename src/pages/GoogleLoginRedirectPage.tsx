import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 토큰 둘 다 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 저장 후 /my 페이지 이동
      setTimeout(() => {
        navigate("/my");
      }, 100);
    } else {
      // 하나라도 없으면 로그인 페이지로
      navigate("/login");
    }
  }, [navigate, setAccessToken, setRefreshToken]);

  return (
    <div className="text-center mt-10 text-lg">로그인 처리 중입니다...</div>
  );
};

export default GoogleLoginRedirectPage;
