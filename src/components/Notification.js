"use client";
import { useEffect, useState } from "react";

export default function Notification() {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success");

  useEffect(() => {
    const handler = (e) => {
      setMessage(e.detail.message);
      setType(e.detail.type || "success");
      setTimeout(() => setMessage(null), 3000);
    };
    window.addEventListener("show-notification", handler);
    return () => window.removeEventListener("show-notification", handler);
  }, []);

  if (!message) return null;

  return <div className={`notification ${type}`}>{message}</div>;
}
