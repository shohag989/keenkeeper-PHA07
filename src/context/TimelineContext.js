"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import seedTimeline from "@/data/timeline.json";

const TimelineContext = createContext();

const STORAGE_KEY = "keenkeeper.timeline.v1";

function normalizeType(type) {
  return String(type ?? "").trim().toLowerCase();
}

function toIsoDate(dateLike) {
  if (!dateLike) return new Date().toISOString().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateLike)) return dateLike;
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function sanitizeEntries(entries) {
  const arr = Array.isArray(entries) ? entries : [];
  return arr
    .map((e) => ({
      id: e?.id ?? Date.now(),
      friendName: String(e?.friendName ?? "").trim(),
      type: normalizeType(e?.type),
      date: toIsoDate(e?.date),
    }))
    .filter((e) => e.friendName && e.type);
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(() => sanitizeEntries(seedTimeline));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        return;
      }
      const parsed = JSON.parse(raw);
      setEntries(sanitizeEntries(parsed));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  const addEntry = (friendName, type) => {
    const newEntry = {
      id: Date.now(),
      friendName: String(friendName ?? "").trim(),
      type: normalizeType(type),
      date: new Date().toISOString().slice(0, 10),
    };
    if (!newEntry.friendName || !newEntry.type) return;
    setEntries((prev) => [newEntry, ...prev]);
  };

  const value = useMemo(() => ({ entries, addEntry }), [entries]);

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

export const useTimeline = () => useContext(TimelineContext);