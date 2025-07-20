import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// Axios 인스턴스 생성
// 모든 API 요청은 이 인스턴스를 통해 이루어짐
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // .env에 정의된 백엔드 서버 주소 사용
});

// 요청 인터셉터 등록
// 모든 요청 전에 실행되어 accessToken이 있으면 Authorization 헤더에 자동으로 추가됨
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 accessToken 가져오기
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }

    // 수정된 config 반환하여 요청 진행
    return config;
  },
  (error) => {
    // 요청 중 에러 발생 시 에러 반환
    return Promise.reject(error);
  }
);
