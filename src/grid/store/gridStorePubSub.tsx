const gridStores = new Map();

export const gridStorePubSub = (gridIdentifier: string) => {
  if (!gridStores.has(gridIdentifier)) {
    gridStores.set(gridIdentifier, {
      values: new Map<string, React.JSX.Element | string | number | boolean>(),
      listeners: new Map<string, Set<() => void>>(),
    });
  }

  const store = gridStores.get(gridIdentifier);

  return {
    values: store.values,
    listeners: store.listeners,

    get(id: string) {
      return this.values.get(`${gridIdentifier}_${id}`);
    },

    set(id: string, value: number) {
      this.values.set(`${gridIdentifier}_${id}`, value);
      const ls = this.listeners.get(`${gridIdentifier}_${id}`);
      if (ls) for (const l of ls) l();
    },

    subscribe(id: string, callback: () => void) {
      if (!this.listeners.has(`${gridIdentifier}_${id}`)) {
        this.listeners.set(`${gridIdentifier}_${id}`, new Set());
      }
      this.listeners.get(`${gridIdentifier}_${id}`)!.add(callback);
      return () => {
        const listenerSet = this.listeners.get(`${gridIdentifier}_${id}`);
        if (listenerSet) {
          listenerSet.delete(callback);
        }
      };
    },

    cleanup() {
      gridStores.forEach((store, name) => {
        if (name?.startsWith(gridIdentifier)) {
          gridStores.delete(name);
        }
      });
    },
  };
};
