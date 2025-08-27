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
    <div className="h-screen w-screen overflow-x-auto bg-white">
      <div className="w-[480px] mx-auto h-screen flex flex-col items-center justify-center gap-4 shrink-0">
        <h2 className="text-gray-500 text-sm whitespace-nowrap shrink-0">
          카카오 프로필
        </h2>
        <img
          src={user.avatar}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full border object-cover shrink-0"
        />
        <h1 className="text-xl font-bold whitespace-nowrap shrink-0">
          {user.name}님, 환영합니다 🎉
        </h1>
        <p className="text-sm text-gray-600 whitespace-nowrap shrink-0">
          {user.bio}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-yellow-400 px-4 py-2 rounded text-white hover:bg-yellow-600 transition shrink-0"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPageKakao;
