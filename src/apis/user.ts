import { axiosInstance } from "./axios";

// 내 정보 조회
export const getMyInfo = async () => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

// 회원 탈퇴
export const deleteMyAccount = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};
