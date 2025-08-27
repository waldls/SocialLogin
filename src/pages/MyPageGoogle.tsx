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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // navigate에만 의존성에 추가

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
    <div className="relative min-h-screen w-screen overflow-x-auto bg-gradient-to-b from-white via-indigo-100 to-indigo-200">
      <div className="w-[560px] mx-auto min-h-screen flex items-center justify-center p-8 shrink-0">
        <div className="relative w-full rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl p-10 flex flex-col items-center gap-6">
          <div className="pointer-events-none absolute -top-8 left-1/2 h-16 w-56 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />
          <h2 className="text-gray-500 text-sm whitespace-nowrap">프로필</h2>
          <img
            src={user.avatar}
            alt="프로필 이미지"
            className="w-28 h-28 rounded-full object-cover shadow-lg ring-4 ring-indigo-200 ring-offset-4 ring-offset-white"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
              {user.name}
            </span>
            <span className="text-gray-800"> 님, 환영합니다 🎉</span>
          </h1>
          {user.bio && (
            <p className="text-sm text-gray-700/90 text-center leading-relaxed whitespace-pre-line">
              {user.bio}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="mt-2 h-11 px-5 rounded-xl bg-red-400 text-white font-semibold shadow-md hover:shadow-lg hover:bg-red-600 active:scale-[0.98] transition"
          >
            로그아웃
          </button>
          <div className="mt-3 text-[11px] text-gray-500 text-center">
            안전한 사용을 위해{" "}
            <span className="font-semibold text-gray-600">
              이용 후 로그아웃
            </span>
            을 권장합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageGoogle;
