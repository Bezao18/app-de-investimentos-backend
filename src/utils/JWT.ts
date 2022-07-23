import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import HTTPErrorMessage from './HTTPErrorMessage';

dotenv.config();

const jwtConfig: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret: string | undefined = process.env.JWT_SECRET || 'segredo';
export const createToken = ({ Email }: Omit<any, 'Senha'>): string | HTTPErrorMessage => {
  if (!secret) {
    throw new HTTPErrorMessage(500, 'Variável de ambiente JWT_SECRET indefinida');
  }
  const token = sign({ Email }, secret, jwtConfig);
  return token;
};

export const validateJWT = (token: string): JwtPayload => {
  try {
    const decodedToken = verify(token, secret);
    return decodedToken as JwtPayload;
  } catch (e) {
    throw new HTTPErrorMessage(401, 'Token inválido');
  }
};