const initialData = [
  { id: "row1", x: 1, y: 2, z: 5 },
  { id: "row2", x: 199, y: 5, z: 50 },
  { id: "row3", x: 21, y: 6, z: 52 },
  { id: "row4", x: 33, y: 7, z: 33 },
];

export type RealtimeData = { id: string; x: number; y: number; z: number };

import { useEffect, useRef } from "react";

export const useRealtimeData = () => {
  const dataRef = useRef([...initialData]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<
    | ((change: { id: string; key: keyof RealtimeData; value: number }) => void)
    | null
  >(null);

  useEffect(() => {
    function randomizeData() {
      const rowIdx = Math.floor(Math.random() * dataRef.current.length);
      const keys = ["x", "y", "z"];
      const key = keys[Math.floor(Math.random() * keys.length)] as
        | "x"
        | "y"
        | "z";
      const newValue = Math.floor(Math.random() * 200);

      const rowId = dataRef.current[rowIdx].id;

      dataRef.current = dataRef.current.map((row, idx) =>
        idx === rowIdx ? { ...row, [key]: newValue } : row
      );

      if (callbackRef.current) {
        callbackRef.current({
          id: rowId,
          key: key,
          value: newValue,
        });
      }
    }

    function scheduleNext() {
      const delay = 1000 + Math.random() * 1000;
      timerRef.current = setTimeout(() => {
        randomizeData();
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onData = (
    callback: (change: {
      id: string;
      key: keyof RealtimeData;
      value: number;
    }) => void
  ) => {
    callbackRef.current = callback;
  };

  return { onData, snapshot: initialData };
};
