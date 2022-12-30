import { createRef, useContext, useEffect, useRef } from "react";
import './index.css'
import { useSplitPaneContext } from "./SplitPaneContext";

export const SplitPaneTop: React.FC = (props) => {
    const topRef = useRef<HTMLDivElement>(null);
    const { clientHeight, setClientHeight } = useSplitPaneContext()
  
    useEffect(() => {
      if (!clientHeight) {
        topRef.current && setClientHeight(topRef.current.clientHeight);
        return;
      }
  
      if (topRef.current){
          topRef.current.style.minHeight = clientHeight + "px";
          topRef.current.style.maxHeight = clientHeight + "px";
      }
    }, [clientHeight]);
  
    return (
      <div {...props} className="split-pane-top" ref={topRef}>
        <h1>Famous quotes:</h1>
        <ul>
          <li>Item here</li>
        </ul>
      </div>
    );
  };