import { google } from "googleapis";
import { oauthClient } from "./oauth";

// assuming that we already have the tokens, fetch calendar list
export const getCalendarList = async (tokens: any) => {
  const oauth2Client = oauthClient(tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const { data } = await calendar.calendarList.list();
  return data;
};

// assuming that we already have the tokens, fetch calendar events
export const getCalendarEvents = async (tokens: any, calendarId: string) => {
  const oauth2Client = oauthClient(tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const { data } = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  return data;
};

// assuming that we already have the tokens, create calendar event
export const createCalendarEvent = async (
  tokens: any,
  calendarId: string,
  event: any
) => {
  const oauth2Client = oauthClient(tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const { data } = await calendar.events.insert({
    calendarId,
    requestBody: event,
  });
  return data;
};
