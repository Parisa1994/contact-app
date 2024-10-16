import { useState } from "react";
import { ContextStore } from "./store";

export default function ContextProvider({
  children,
}) {
  const [store, setStore] = useState();

  return (
    <ContextStore.Provider value={{ store, setStore }}>
      {children}
    </ContextStore.Provider>
  );
}
