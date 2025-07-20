import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../apis/user";

const MyPage = () => {
  const navigate = useNavigate();

  // localStorage에서 accessToken, refreshToken 다루는 커스텀 훅
  const { getItem, removeItem: removeAccess } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { removeItem: removeRefresh } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  // 사용자 정보를 저장할 상태
  const [user, setUser] = useState<{
    name: string;
    avatar: string;
    bio: string;
  } | null>(null);

  // 페이지 진입 시 accessToken 유무 확인 및 유저 정보 요청
  useEffect(() => {
    const token = getItem();
    if (!token || token === "null") {
      // 토큰 없으면 로그인 페이지로 이동
      navigate("/login");
      return;
    }

    // 유저 정보 가져오기
    const fetchUser = async () => {
      try {
        const res = await getMyInfo();
        setUser(res.data); // 받아온 사용자 정보 저장
      } catch (error) {
        // 토큰이 만료되었거나 에러 발생 시 로그인 페이지로 이동
        console.error("유저 정보 불러오기 실패:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [getItem, navigate]);

  // 로그아웃 처리: 토큰 제거 + 로그인 페이지로 이동
  const handleLogout = () => {
    removeAccess();
    removeRefresh();
    navigate("/login");
  };

  // 아직 사용자 정보 로딩 중이면 렌더링 안 함
  if (!user) return null;

  // 유저 정보 화면 렌더링
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-gray-500 text-sm">프로필</h2>
      <img
        src={user.avatar}
        alt="프로필 이미지"
        className="w-24 h-24 rounded-full border object-cover"
      />
      <h1 className="text-xl font-bold">{user.name}님, 환영합니다 🎉</h1>
      <p className="text-sm text-gray-600">{user.bio}</p>

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-400 px-4 py-2 rounded text-white hover:bg-red-600 transition"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
