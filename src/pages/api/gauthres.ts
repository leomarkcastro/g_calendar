// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getGoogleTokensFromCode } from "@/server/google/oauth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query;
  const code = q.code;
  if (!code) return res.status(400).json({ error: "No code found" });
  const data = await getGoogleTokensFromCode(code as string);
  res.status(200).json(data);
}
