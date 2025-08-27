import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPageKakao = () => {
  const navigate = useNavigate();

  // 유저 정보를 저장할 상태 (없으면 null)
  const [user, setUser] = useState<{
    name: string;
    avatar: string;
    bio: string;
  } | null>(null);

  useEffect(() => {
    try {
      // localStorage에서 사용자 정보 가져오기
      const userInfo = localStorage.getItem("userInfo");

      // 정보가 없으면 로그인 페이지로 이동
      if (!userInfo) {
        navigate("/login");
        return;
      }

      // JSON 문자열을 객체로 파싱
      const parsed = JSON.parse(userInfo);

      // 상태에 저장
      setUser(parsed);
    } catch (err) {
      // 파싱 실패 시 로그인 페이지로 이동
      console.error("카카오 유저 정보 파싱 오류:", err);
      navigate("/login");
    }
  }, [navigate]);

  // 로그아웃 버튼 클릭 시 실행
  const handleLogout = () => {
    // 토큰 및 사용자 정보 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");

    // 로그인 페이지로 이동
    navigate("/login");
  };

  // 사용자 정보가 없으면 아무것도 렌더링하지 않음
  if (!user) return null;

  // 마이페이지 화면
  return (
    <div className="relative min-h-screen w-screen overflow-x-auto bg-gradient-to-b from-white via-indigo-100 to-indigo-200">
      <div className="w-[560px] mx-auto min-h-screen flex items-center justify-center p-8 shrink-0">
        <div className="relative w-full rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl p-10 flex flex-col items-center gap-6">
          <div className="pointer-events-none absolute -top-8 left-1/2 h-16 w-56 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />
          <h2 className="text-gray-500 text-sm whitespace-nowrap">내 프로필</h2>
          <img
            src={user.avatar}
            alt="프로필 이미지"
            className="w-28 h-28 rounded-full object-cover shadow-lg ring-4 ring-indigo-200 ring-offset-4 ring-offset-white"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
              {user.name}
            </span>
            <span className="text-gray-800">님, 환영합니다 🎉</span>
          </h1>
          <button
            onClick={handleLogout}
            className="mt-2 h-11 px-5 rounded-xl bg-yellow-400 text-white font-semibold shadow-md hover:shadow-lg hover:bg-yellow-500 active:scale-[0.98] transition"
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

export default MyPageKakao;
