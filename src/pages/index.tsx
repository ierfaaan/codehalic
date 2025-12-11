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

  return <Grid gridName="TEST" gridRef={myGridRef} data={snapshot} />;
}
