/* eslint-disable @typescript-eslint/no-empty-object-type */
import { gridStorePubSub } from "@/grid/store/gridStorePubSub";
import React, { useSyncExternalStore } from "react";
import { idGenerator } from "../Grid";

interface CellPropsType<TData = object> {
  gridName: string;
  cellKey: string;
  rowKey: string;
  cellValue: TData[keyof TData];
  cellRenderer?: {
    [K in keyof TData]: (value: TData[keyof TData]) => React.ReactNode;
  };
}

export const Cell = <TData extends object>({
  gridName,
  cellKey,
  cellValue,
  cellRenderer,
  rowKey,
}: CellPropsType<TData>) => {
  const id = idGenerator({ cellKey, gridName, rowKey });

  const val = useSyncExternalStore(
    (cb) => {
      return gridStorePubSub(gridName).subscribe(id, cb);
    },
    () => {
      return gridStorePubSub(gridName).get(id);
    },
    () => {
      return gridStorePubSub(gridName).get(id);
    }
  );

  return (
    <div className="border">
      {val ?? cellRenderer?.[cellKey as keyof TData](cellValue)}
    </div>
  );
};
