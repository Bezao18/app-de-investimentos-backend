import { Request, Response } from "express";
import createClient from "../services/cadastro.service";

const newClientAccount = async (req: Request, res: Response) => {
  const response: any = await createClient(req.body);
  return res.status(200).json(response);
}

export default newClientAccount;