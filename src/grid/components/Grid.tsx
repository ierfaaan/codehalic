/* eslint-disable @typescript-eslint/no-empty-object-type */
import { RealtimeData } from "@/socket/useRealtimeData";
import { RefObject, useEffect, useImperativeHandle } from "react";
import { Row } from "./Row/Row";
import { gridStorePubSub } from "../store/gridStorePubSub";

export interface GridRef {
  updateData: (
    rowKey: string,
    cellKey: keyof RealtimeData,
    cellValue: number
  ) => void;
}

interface GridPropsType {
  data?: RealtimeData[];
  gridName: string;
  gridRef?: RefObject<GridRef | null>;
}

export const idGenerator = ({
  cellKey,
  gridName,
  rowKey,
}: {
  gridName: string;
  rowKey: string;
  cellKey: string;
}) => {
  const id = `${gridName}-cell-${rowKey}-${String(cellKey)}`;
  return id;
};

export const Grid = ({ data, gridRef, gridName }: GridPropsType) => {
  useImperativeHandle(gridRef, () => {
    return {
      updateData(rowKey, cellKey, cellValue) {
        const id = idGenerator({ cellKey, gridName, rowKey });
        gridStorePubSub(gridName).set(id, cellValue);
      },
    };
  });

  useEffect(() => {
    return () => {
      gridStorePubSub(gridName).cleanup();
    };
  });

  return (
    <div className="flex flex-col gap-8 text-4xl">
      <div className="grid grid-cols-4 gap-4 font-bold">
        <h1>ID</h1>
        <h1>X</h1>
        <h1>Y</h1>
        <h1>Z</h1>
      </div>
      <div className="flex flex-col gap-8">
        {data?.map((item) => {
          return <Row gridName={gridName} key={item.id} row={item} />;
        })}
      </div>
    </div>
  );
};
