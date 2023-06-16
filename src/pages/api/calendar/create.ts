// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCalendarEvent, getCalendarList } from "@/server/google/calendar";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get token from json body
  const { token, calendarId, event } = req.body;

  // get calendar
  const calendarData = await createCalendarEvent(token, calendarId, event);

  // return calendar
  res.status(200).json(calendarData);
}
