export function authHeader() {
  // return authorization header with jwt token
  const accessToken = JSON.parse(localStorage.getItem('access_token'));

  if (accessToken) {
    return { 'x-access-token': `${accessToken}` };
  }

  return {};
}
