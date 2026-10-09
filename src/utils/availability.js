// src/utils/availability.js

const SCHEDULE_KEY = "onyx-barber-schedule";
const BLOCKS_KEY = "onyx-barber-blocks";

export const defaultSchedule = [
  { id: 1, day: "Segunda-feira", enabled: true, opening: "08:00", closing: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  { id: 2, day: "Terça-feira", enabled: true, opening: "08:00", closing: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  { id: 3, day: "Quarta-feira", enabled: true, opening: "08:00", closing: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  { id: 4, day: "Quinta-feira", enabled: true, opening: "08:00", closing: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  { id: 5, day: "Sexta-feira", enabled: true, opening: "08:00", closing: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  { id: 6, day: "Sábado", enabled: true, opening: "08:00", closing: "14:00", breakStart: "", breakEnd: "" },
  { id: 7, day: "Domingo", enabled: false, opening: "08:00", closing: "14:00", breakStart: "", breakEnd: "" },
];

export function getSchedule() {
  try {
    const saved = localStorage.getItem(SCHEDULE_KEY);
    return saved ? JSON.parse(saved) : defaultSchedule;
  } catch {
    return defaultSchedule;
  }
}

export function saveSchedule(schedule) {
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
}

export function getBlocks() {
  try {
    return JSON.parse(localStorage.getItem(BLOCKS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBlocks(blocks) {
  localStorage.setItem(BLOCKS_KEY, JSON.stringify(blocks));
}

export function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDaySchedule(date) {
  const jsDay = date.getDay();
  const scheduleId = jsDay === 0 ? 7 : jsDay;

  return getSchedule().find((item) => item.id === scheduleId);
}

export function getAvailableTimes(date, duration) {
  const daySchedule = getDaySchedule(date);

  if (!daySchedule || !daySchedule.enabled) {
    return [];
  }

  const dateString = dateKey(date);

  const blocks = getBlocks().filter(
    (block) => block.date === dateString
  );

  if (blocks.some((block) => block.allDay)) {
    return [];
  }

  const toMinutes = (time) => {
    if (!time) return null;

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  };

  const opening = toMinutes(daySchedule.opening);
  const closing = toMinutes(daySchedule.closing);
  const breakStart = toMinutes(daySchedule.breakStart);
  const breakEnd = toMinutes(daySchedule.breakEnd);

  if (
    opening === null ||
    closing === null ||
    closing <= opening ||
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    return [];
  }

  const result = [];

  const overlaps = (startA, endA, startB, endB) =>
    startA < endB && startB < endA;

  for (
    let start = opening;
    start + duration <= closing;
    start += 30
  ) {
    const end = start + duration;

    const overlapsBreak =
      breakStart !== null &&
      breakEnd !== null &&
      breakEnd > breakStart &&
      overlaps(start, end, breakStart, breakEnd);

    if (overlapsBreak) {
      continue;
    }

    const conflictsWithBlock = blocks.some((block) => {
      if (block.allDay) {
        return true;
      }

      const blockStart = toMinutes(block.start);
      const blockEnd = toMinutes(block.end);

      return (
        blockStart !== null &&
        blockEnd !== null &&
        blockEnd > blockStart &&
        overlaps(start, end, blockStart, blockEnd)
      );
    });

    if (conflictsWithBlock) {
      continue;
    }

    const now = new Date();

    if (dateKey(date) === dateKey(now)) {
      const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

      if (start <= currentMinutes) {
        continue;
      }
    }

    const hours = String(Math.floor(start / 60)).padStart(2, "0");
    const minutes = String(start % 60).padStart(2, "0");

    result.push(`${hours}:${minutes}`);
  }

  return result;
}