// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getGoogleAuthUrl } from "@/server/google/oauth";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authURL = getGoogleAuthUrl();
  res.status(200).json({ authURL });
}
