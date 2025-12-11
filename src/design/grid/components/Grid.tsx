/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ReactNode, RefObject, useEffect, useImperativeHandle } from "react";
import { Row } from "./Row/Row";
import { gridStorePubSub } from "../store/gridStorePubSub";

export interface GridRef<TData> {
  updateData: (
    rowKey: string,
    cellKey: keyof TData,
    cellValue: TData[keyof TData]
  ) => void;
}

export interface Column<TData> {
  id: keyof TData;
  header: string;
  cell: (value: TData[keyof TData]) => ReactNode;
}

interface GridPropsType<TData = {}> {
  data?: TData[];
  columns?: Column<TData>[];
  registerUniqueKey?: keyof TData;
  gridName: string;
  gridRef?: RefObject<GridRef<TData> | null>;
}

export const idGenerator = <TData extends object>({
  cellKey,
  gridName,
  rowKey,
}: {
  gridName: string;
  rowKey: string;
  cellKey: keyof TData;
}) => {
  const id = `${gridName}-cell-${rowKey}-${String(cellKey)}`;
  return id;
};

export const Grid = <TData extends {}>({
  data,
  gridRef,
  columns,
  gridName,
  registerUniqueKey,
}: GridPropsType<TData>) => {
  const cellRenderer = columns?.reduce((prevData, currentItem) => {
    return {
      ...prevData,
      [currentItem.id]: currentItem.cell,
    };
  }, {} as { [K in keyof TData]: Column<TData>["cell"] });

  useImperativeHandle(gridRef, () => {
    return {
      updateData(rowKey, cellKey, cellValue) {
        const id = idGenerator({ cellKey, gridName, rowKey });
        const components = cellRenderer?.[cellKey as keyof TData](cellValue);
        gridStorePubSub(gridName).set(id, components);
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
        {columns?.map((col) => (
          <h1 key={String(col.id)}>{col.header}</h1>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {data?.map((item, index) => {
          return (
            <Row
              key={index}
              cellRenderer={cellRenderer}
              rowKey={String(registerUniqueKey)}
              row={item}
              gridName={gridName}
            />
          );
        })}
      </div>
    </div>
  );
};
