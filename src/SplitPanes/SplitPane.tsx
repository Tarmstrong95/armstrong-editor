import React, {
    useEffect,
    useRef,
    useState,
  } from "react";
  import {SplitPaneContext} from "./SplitPaneContext";
  
  export const SplitPane: React.FC<{children: React.ReactNode, className: string}> = ({ children, ...props }) => {
    const [clientHeight, setClientHeight] = useState<number|null>(null);
    const [clientWidth, setClientWidth] = useState<number|null>(null);
    const yDividerPos = useRef<number|null>(null);
    const xDividerPos = useRef<number|null>(null);
    const [holding, setHolding] = useState(false)
  
    const onMouseHoldDown = (e: React.MouseEvent) => {
      setHolding(true)
    };
  
    const onMouseHoldUp = () => {
      yDividerPos.current = null;
      xDividerPos.current = null;
      setHolding(false)
    };
  
    const onMouseHoldMove = (e: MouseEvent) => {
      if (!holding) return

      clientHeight && yDividerPos.current && setClientHeight(clientHeight + e.clientY - yDividerPos.current);
      clientWidth && xDividerPos.current && setClientWidth(clientWidth + e.clientX - xDividerPos.current);

      yDividerPos.current = e.clientY;
      xDividerPos.current = e.clientX;
    };
  
    useEffect(() => {
      document.addEventListener("mouseup", onMouseHoldUp);
      document.addEventListener("mousemove", onMouseHoldMove);
  
      return () => {
        document.removeEventListener("mouseup", onMouseHoldUp);
        document.removeEventListener("mousemove", onMouseHoldMove);
      };
    });
  
    return (
      <div {...props}>
        <SplitPaneContext.Provider
          value={{
            clientHeight,
            setClientHeight,
            clientWidth,
            setClientWidth,
            onMouseHoldDown,
          }}
        >
          {children}
        </SplitPaneContext.Provider>
      </div>
    );
  };