import Cookies from 'js-cookie';

export const setTokensInCookie = (accessToken: string, refreshToken: string) => {
  if (!!accessToken) {
    setInCookie('accessToken', accessToken, 7);
  }
  if (!!refreshToken) {
    setInCookie('refreshToken', refreshToken, 7);
  }
};

export const clearCookie = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getTokensFromCookie = (): { accessToken: string; refreshToken: string } => {
  const accessToken = Cookies.get('accessToken')!;
  const refreshToken = Cookies.get('refreshToken')!;
  return { accessToken, refreshToken };
};

const setInCookie = (key: string, value: string, expires: number) => {
  Cookies.set(key, value, { expires });
};
