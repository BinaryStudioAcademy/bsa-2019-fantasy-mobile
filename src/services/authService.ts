import callWebApi from '../helpers/webApiHelper';
import { LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { User } from '../types/user.type';

export const login = async (request: LoginCredentials) => {
  const response = await callWebApi({
    endpoint: '/api/auth/login',
    type: 'POST',
    request,
  });
  return response.json();
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await callWebApi({
      endpoint: '/api/auth/user',
      type: 'GET',
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
