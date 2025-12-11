import { Cell } from "./_Cell";

interface RowPropsType<TData extends object> {
  row: TData;
  rowKey: string;
  gridName: string;
  cellRenderer?: {
    [K in keyof TData]: (value: TData[keyof TData]) => React.ReactNode;
  };
}

export const Row = <TData extends object>({
  row,
  rowKey,
  cellRenderer,
  gridName,
}: RowPropsType<TData>) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.keys(row).map((cellKey) => {
        return (
          <Cell
            gridName={gridName}
            key={cellKey}
            cellRenderer={cellRenderer}
            rowKey={String(row[rowKey as keyof TData])}
            cellKey={cellKey}
            cellValue={row[cellKey as keyof TData]}
          />
        );
      })}
    </div>
  );
};
