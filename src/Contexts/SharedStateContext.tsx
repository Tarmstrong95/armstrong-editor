import React, { createContext, ReactNode, useContext, useState } from "react";

interface SharedStateContextType {
  fileContentsRef: string,
  setFileContentsRef: (val: string) => void,
  fileName: string,
  setFileName: (val: string) => void,
  fileInFocus: string,
  setFileInFocus: (val: string) => void,
  fileTouched: boolean
  setFileTouched: (val: boolean) => void
}

const SharedStateContext = createContext<SharedStateContextType>({} as SharedStateContextType);

export const useSharedState = () => useContext(SharedStateContext);

const SharedStateContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [fileContentsRef, setFileContentsRef] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileInFocus, setFileInFocus] = useState('')
  const [fileTouched, setFileTouched] = useState(false)

  const value = {
    fileContentsRef,
    setFileContentsRef,
    fileName,
    setFileName,
    fileInFocus, setFileInFocus,
    fileTouched, setFileTouched
  };

  return (
    <SharedStateContext.Provider value={value}>
      {props.children}
    </SharedStateContext.Provider>
  );
}

export default SharedStateContextProvider;
