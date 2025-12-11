/* eslint-disable @typescript-eslint/no-empty-object-type */
import { gridStorePubSub } from "@/grid/store/gridStorePubSub";
import React, { FunctionComponent, useSyncExternalStore } from "react";
import { idGenerator } from "../Grid";

interface CellPropsType {
  gridName: string;
  cellKey: string;
  rowKey: string;
  cellValue: string | number;
}

export const Cell: FunctionComponent<CellPropsType> = ({
  gridName,
  cellKey,
  cellValue,
  rowKey,
}) => {
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

  return <div className="border">{val ? val : cellValue}</div>;
};
