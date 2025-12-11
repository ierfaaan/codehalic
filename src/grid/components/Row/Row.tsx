import { RealtimeData } from "@/socket/useRealtimeData";
import React, { FunctionComponent } from "react";
import { Cell } from "./_Cell";

interface RowPropsType {
  row: RealtimeData;
  gridName: string;
}

export const Row: FunctionComponent<RowPropsType> = ({ row, gridName }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.keys(row).map((cellKey) => {
        return (
          <Cell
            gridName={gridName}
            key={cellKey}
            rowKey={String(row["id"])}
            cellKey={cellKey}
            cellValue={row[cellKey as keyof RealtimeData]}
          />
        );
      })}
    </div>
  );
};
