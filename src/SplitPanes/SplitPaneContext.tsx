import { createContext, useContext } from "react";

type SplitPaneContextType = {
    clientHeight: number | null,
    setClientHeight: (val: number) => void,
    clientWidth: number | null,
    setClientWidth: (val: number) => void,
    onMouseHoldDown: (e: React.MouseEvent) => void,
  }

export const SplitPaneContext = createContext<SplitPaneContextType>({} as SplitPaneContextType);
export const useSplitPaneContext = () => useContext(SplitPaneContext)
