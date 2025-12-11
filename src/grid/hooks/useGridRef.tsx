import { useRef } from "react";
import { GridRef } from "../components/Grid";

export const useGridRef = () => {
  return useRef<GridRef>(null);
};
