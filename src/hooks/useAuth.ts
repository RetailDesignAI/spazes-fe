import { getTokensFromCookie } from '@/lib/cookies';

const useAuth = () => {
  const { accessToken } = getTokensFromCookie();

  if (accessToken) {
    return true;
  }

  return false;
};

export default useAuth;
