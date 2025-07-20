// 특정 키(key)에 대한 localStorage 조작 함수들을 반환하는 커스텀 훅

export const useLocalStorage = (key: string) => {
  // localStorage에 값 저장 (문자열로 변환하여 저장)
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("localStorage 저장 중 에러:", error);
    }
  };

  // localStorage에서 값 가져오기 (문자열을 다시 원래 값으로 파싱)
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log("localStorage 불러오기 중 에러:", error);
    }
  };

  // localStorage에서 해당 키 제거
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log("localStorage 삭제 중 에러:", error);
    }
  };

  // 위 세 가지 기능을 객체로 반환
  return { setItem, getItem, removeItem };
};
