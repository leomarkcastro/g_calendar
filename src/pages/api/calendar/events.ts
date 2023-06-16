// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCalendarEvents, getCalendarList } from "@/server/google/calendar";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get token from json body
  const { token, calendarId } = req.body;

  // get calendar
  const calendarData = await getCalendarEvents(token, calendarId);

  // return calendar
  res.status(200).json(calendarData);
}
