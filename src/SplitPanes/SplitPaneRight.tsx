import { CSSProperties, ReactNode } from 'react';
import './index.css'

interface SplitPaneRightProps {
children?: ReactNode
style?: CSSProperties
}

export const SplitPaneRight: React.FC<SplitPaneRightProps> = (props) => {
  
    return (
      <div {...props} className="split-pane-right"/>
    );
  };
