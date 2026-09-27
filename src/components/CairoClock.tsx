import { useEffect, useState } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo" }).format(new Date());

/** Current time in Cairo, refreshed every 15 seconds. */
const CairoClock = () => {
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="font-mono">{time}</span>;
};

export default CairoClock;
