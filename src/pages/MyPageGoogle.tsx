import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo, logout } from "../apis/user";

const MyPageGoogle = () => {
  const navigate = useNavigate();

  // accessToken 관련 localStorage 접근 함수
  const { getItem, removeItem: removeAccess } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );

  // refreshToken 관련 localStorage 접근 함수
  const { removeItem: removeRefresh } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  // 사용자 정보 상태
  const [user, setUser] = useState<{
    name: string;
    avatar: string;
    bio: string;
  } | null>(null);

  useEffect(() => {
    // 토큰 유무 확인
    const token = getItem();

    if (!token || token === "null") {
      // 토큰이 없으면 로그인 페이지로 이동
      navigate("/login");
      return;
    }

    // 사용자 정보 요청
    const fetchUser = async () => {
      try {
        const res = await getMyInfo();
        setUser(res.data);
      } catch (error) {
        // 인증 실패 시 로그인 페이지로 이동
        console.error("유저 정보 불러오기 실패:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await logout();
    } catch (err) {
      // 로그아웃 요청이 실패해도 로컬 토큰만 제거해도 로그아웃 처리에는 충분함
      console.error("서버 로그아웃 실패:", err);
    } finally {
      // 로컬에서 토큰 삭제 후 로그인 페이지로 이동
      removeAccess();
      removeRefresh();
      navigate("/login");
    }
  };

  // 사용자 정보 로딩 중일 때는 렌더링 생략
  if (!user) return null;

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

export default MyPageGoogle;
