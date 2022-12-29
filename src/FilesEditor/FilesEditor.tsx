import { Cancel } from "@mui/icons-material";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Ref, useEffect, useRef } from "react";
import { useSharedState } from "../Contexts/SharedStateContext";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Tabs } from "./Tabs";


export const FilesEditor = () => {
    const {fileContentsRef, setFileContentsRef, fileInFocus: fileName, setFileInFocus: setFileName} = useSharedState()

    const textRef = useRef<HTMLTextAreaElement>();
  
    const getFileName = (name: string) => {
      const match = name.match(/([^/]+)\.(\w+)(?:\.(\w+))?$/g);
      if (!match) return "no file";
      return match[0];
    };
  
    const getFileExtension = (name: string) => {
      const match = name.match(/\.(\w+)?$/g);
      if (!match) return "txt";
      return match[0].replace(".", "");
    };

    return (
        <Grid item xs={10} md={10}>
            <Stack gap={1} height="100%" sx={{ height: '95vh' }}>
              <Tabs/>
              {!fileName && <Typography variant="h2" textAlign={'center'}>No File Selected</Typography>}
              {!!fileName && <Paper sx={{ flex: 12, p: 2, overflow: 'auto' }} elevation={1}>
                <CodeEditor
                  value={fileContentsRef ?? ''}
                  ref={textRef as Ref<HTMLTextAreaElement>}
                  language={getFileExtension(getFileName(fileName))}
                  placeholder="Please enter text to begin"
                  onChange={(evn) => setFileContentsRef(evn.target.value)}
                  style={{
                    fontSize: 12,
                    backgroundColor: 'transparent',
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
              </Paper>}
            </Stack>
          </Grid>
    )
}