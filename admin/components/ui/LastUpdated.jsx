"use client";

import { useEffect, useState } from "react";

export default function LastUpdated() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString());
  }, []);

  return <span>Last updated: {time}</span>;
}
