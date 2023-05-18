export const getAccessToken = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
};
