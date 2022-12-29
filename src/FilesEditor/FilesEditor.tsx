import { Cancel } from "@mui/icons-material";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Ref, useRef } from "react";
import { useSharedState } from "../Contexts/SharedStateContext";
import CodeEditor from "@uiw/react-textarea-code-editor";


export const FilesEditor = () => {
    const {fileContentsRef, setFileContentsRef, fileName, setFileName} = useSharedState()

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
              <Stack direction={'row'} gap={1} flex={0.5}>
                <Paper sx={{ p: 1, display: 'flex', gap: 0.5, alignItems: 'center' }} elevation={1}><Typography>{getFileName(fileName) || 'no file'}</Typography>{fileName && <Cancel onClick={() => { setFileContentsRef(''); setFileName('') }} sx={{ fontSize: 16 }} />}</Paper>
              </Stack>
              <Paper sx={{ flex: 12, p: 2, overflow: 'auto' }} elevation={1}>
                {!fileContentsRef.length && <Typography>Your file goes here</Typography>}
                {!!fileContentsRef.length && <CodeEditor
                  value={fileContentsRef}
                  ref={textRef as Ref<HTMLTextAreaElement>}
                  language={getFileExtension(getFileName(fileName))}
                  placeholder="Please enter JS code."
                  onChange={(evn) => setFileContentsRef(evn.target.value)}
                  style={{
                    fontSize: 12,
                    backgroundColor: 'transparent',
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />}
              </Paper>
            </Stack>
          </Grid>
    )
}