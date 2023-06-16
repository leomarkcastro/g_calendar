// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCalendarList } from "@/server/google/calendar";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get token from json body
  const { token } = req.body;

  // get calendar
  const calendarData = await getCalendarList(token);

  // return calendar
  res.status(200).json(calendarData);
}
