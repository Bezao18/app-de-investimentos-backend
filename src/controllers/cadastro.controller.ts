import { Request, Response } from "express";
import createClient from "../services/cadastro.service";

const newClientAccount = async (req: Request, res: Response) => {
  const token: string = await createClient(req.body);
  return res.status(200).json({token});
}

export default newClientAccount;