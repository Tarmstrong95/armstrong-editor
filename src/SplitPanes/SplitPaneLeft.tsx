import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import './index.css'
import { useSplitPaneContext } from "./SplitPaneContext";

interface SplitPaneLeftProps {
children?: ReactNode
className?: string
style?: CSSProperties
}

export const SplitPaneLeft: React.FC<SplitPaneLeftProps> = (props) => {
    const topRef = useRef<HTMLDivElement>(null);
    const { clientWidth, setClientWidth } = useSplitPaneContext()
  
    useEffect(() => {
      if (!clientWidth) {
        topRef.current && setClientWidth(topRef.current.clientWidth / 2); return;
      }
  
      if (topRef.current){
          topRef.current.style.minWidth = clientWidth + "px";
          topRef.current.style.maxWidth = clientWidth + "px";
        }
    }, [clientWidth]);
  
    return <div {...props} className="split-pane-left" ref={topRef} />;
  };
