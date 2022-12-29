import React, { createContext, ReactNode, useContext, useState } from "react";

interface SharedStateContextType {
    fileContentsRef: string,
    setFileContentsRef: (val: string) => void,
    fileName: string,
    setFileName: (val: string) => void,
    fileInFocus: string,
    setFileInFocus: (val: string) => void
}

const SharedStateContext = createContext<SharedStateContextType>({} as SharedStateContextType);

export const useSharedState = () => useContext(SharedStateContext);

const SharedStateContextProvider: React.FC<{children?: ReactNode}> = (props) => {
  const [fileContentsRef, setFileContentsRef] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileInFocus, setFileInFocus] = useState('')

  const value = {
    fileContentsRef,
    setFileContentsRef,
    fileName,
    setFileName,
    fileInFocus, setFileInFocus
  };

  return (
    <SharedStateContext.Provider value={value}>
      {props.children}
    </SharedStateContext.Provider>
  );
}

export default SharedStateContextProvider;
