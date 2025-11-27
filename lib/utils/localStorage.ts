const setTokenToLS = (token: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const getTokenFromLS = (): {
  accessToken: string;
  refreshToken: string;
} | null => {
  return localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : null;
};

const removeTokenFromLS = () => {
  localStorage.removeItem("token");
};

export { setTokenToLS, getTokenFromLS, removeTokenFromLS };
