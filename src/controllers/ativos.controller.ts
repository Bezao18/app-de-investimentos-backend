import { Request, Response } from "express";

const getAssets = async (req: Request, res: Response) => {
  return res.status(418).json('Ainda não implementei')
}

export default { getAssets };