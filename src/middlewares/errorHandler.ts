import { Request, Response, NextFunction } from "express";
import HTTPErrorMessage from '../utils/HTTPErrorMessage'


const errorHandler = async (err:Error ,req: Request, res: Response, next:NextFunction) => {
  const { status, message } = err as HTTPErrorMessage;
  res.status(status || 500).json({ message });
}

export default errorHandler;