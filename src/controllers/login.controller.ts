import { Request, Response } from "express";
import clientLogin from "../services/login.service";

const loginToAccount = async (req: Request, res: Response) => {
  const token: string = await clientLogin(req.body);
  return res.status(200).json({ token });
}

export default loginToAccount;