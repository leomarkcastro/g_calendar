import { useState } from "react";

export default function Page() {
  const [calendarList, setCalendarList] = useState([]);

  async function requestCalendarList() {
    const fetchRequest = await fetch(
      "http://localhost:3000/api/calendar/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem("token") as string),
        }),
      }
    );
    const response = await fetchRequest.json();
    console.log(response);
    setCalendarList(response["items"]);
  }

  async function requestCalendarEvents() {
    const fetchRequest = await fetch(
      "http://localhost:3000/api/calendar/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem("token") as string),
          calendarId: "primary",
        }),
      }
    );
    const response = await fetchRequest.json();
    console.log(response);
  }

  async function requestCalendarCreateEvent() {
    const event = {
      summary: "Test Event",
      location: "800 Howard St., San Francisco, CA 94103",
      description:
        "[[Test Event Creation]] A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2023-06-15T00:00:00+08:00",
        timeZone: "Asia/Manila",
      },
      end: {
        dateTime: "2023-06-15T06:00:00+08:00",
        timeZone: "Asia/Manila",
      },
      // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      // attendees: [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    const fetchRequest = await fetch(
      "http://localhost:3000/api/calendar/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem("token") as string),
          calendarId: "primary",
          event: event,
        }),
      }
    );
    const response = await fetchRequest.json();
    console.log(response);
  }

  return (
    <main>
      <p>Calendar page</p>
      <button className="d-btn" onClick={requestCalendarList}>
        Get Calendar List
      </button>
      <div className="p-2">
        {calendarList.map((calendar) => {
          return (
            <div key={calendar["id"]} className="d-card d-card-bordered">
              <div className="d-card-body">
                <p>{calendar["summary"]}</p>
                <p>{calendar["id"]}</p>
              </div>
            </div>
          );
        })}
      </div>
      <input className="m-2 d-input d-input-bordered d-input-primary"></input>
      <button className="d-btn" onClick={requestCalendarEvents}>
        Get Calendar Events
      </button>
      <button className="d-btn" onClick={requestCalendarCreateEvent}>
        Create Calendar Event
      </button>
    </main>
  );
}
