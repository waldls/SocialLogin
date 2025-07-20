import { axiosInstance } from "./axios";

// 내 정보 조회
export const getMyInfo = async () => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

// 로그아웃
export const logout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};
