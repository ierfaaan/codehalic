import { Grid } from "@/grid/components/Grid";
import { useGridRef } from "@/grid/hooks/useGridRef";
import { useRealtimeData } from "@/socket/useRealtimeData";
import { useEffect } from "react";

export default function Home() {
  const myGridRef = useGridRef();

  const { onData, snapshot } = useRealtimeData();

  useEffect(() => {
    onData(({ id, key, value }) => {
      myGridRef.current?.updateData(id, key, value);
    });
  }, []);

  return (
    <Grid
      registerUniqueKey="id"
      gridName="TEST"
      columns={[
        { id: "id", header: "ID", cell: (value) => <div>{value} + TEST1</div> },
        { id: "x", header: "X", cell: (value) => <div>{value} + TEST2</div> },
        { id: "y", header: "Y", cell: (value) => <div>{value} + TEST3</div> },
        { id: "z", header: "Z", cell: (value) => <div>{value} + TEST4</div> },
      ]}
      gridRef={myGridRef}
      data={snapshot}
    />
  );
}
