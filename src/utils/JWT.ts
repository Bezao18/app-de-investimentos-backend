import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import HTTPErrorMessage from './HTTPErrorMessage';

dotenv.config();

const jwtConfig: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret: string | undefined = process.env.JWT_SECRET || 'é segredo po';
const createToken = ({ CodCliente, Email }: Omit<any, 'Senha, Cpf, Saldo'>): string | HTTPErrorMessage => {
  if (!secret) {
    throw new HTTPErrorMessage(500, 'Variável de ambiente JWT_SECRET indefinida');
  }
  const token = sign({ CodCliente, Email }, secret, jwtConfig);
  return token;
};

const validateToken = (token: string): JwtPayload => {
  try {
    const decodedToken = verify(token, secret);
    return decodedToken as JwtPayload;
  } catch (e) {
    throw new HTTPErrorMessage(401, 'Invalid token');
  }
};

export default { createToken, validateToken };