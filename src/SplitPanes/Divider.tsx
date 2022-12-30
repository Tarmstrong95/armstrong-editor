import { useContext } from "react";
import { useSplitPaneContext } from "./SplitPaneContext";

export const Divider: React.FC<{className: string}> = (props) => {
    const { onMouseHoldDown } = useSplitPaneContext()
  
    return <div {...props} onMouseDown={onMouseHoldDown} />;
  };