import { CSSProperties, ReactNode, useContext } from "react";
import './index.css'

interface SplitPaneBottomProps {
children: ReactNode
style: CSSProperties
}

export const SplitPaneBottom: React.FC<SplitPaneBottomProps> = (props) => {

  return (
    <div {...props} className="split-pane-bottom">
      {props.children}
    </div>
  );
};
