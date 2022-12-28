import { Box, Button, createTheme, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { invoke } from "@tauri-apps/api";
import { readTextFile } from '@tauri-apps/api/fs'
import { open } from '@tauri-apps/api/dialog'
import "./App.css";
import Dashboard from './dashboard/Dashboard'
import { useState, useRef, Ref } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [fileContentsRef, setFileContentsRef] = useState("")
  const textRef = useRef<HTMLTextAreaElement>()

  const readFile = async (filePath: string) => {
    if (!filePath) return
    setFileContentsRef(await readTextFile(filePath))
  }

  const getFile = async () => {
    let selectedPath: string | string[] | null = ''
    try {
      selectedPath = await open({
        multiple: false,
        title: "Open a file"
      })
    } catch (err) {
      console.error(err)
    }
    if (typeof selectedPath === 'string') await readFile(selectedPath)
    else {
      alert('Cannot open this file')
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ p: 1 }}>
        <Grid container wrap='nowrap' gap={2} >
          <Grid item xs={2} md={2} minWidth={150} >
            <Paper sx={{ p: 2, height: '95vh' }} elevation={2}>
              <Typography>You have not opened a file yet</Typography>
              <Button onClick={getFile} size="small" variant="contained" fullWidth sx={{ mt: 1 }}>Open File</Button>
            </Paper>
          </Grid>

          <Grid item xs={10} md={10}>
            <Paper sx={{ height: '95vh', p: 2, overflow: 'auto' }} elevation={2}>
              {!fileContentsRef.length && <Typography>Your file goes here</Typography>}
              {!!fileContentsRef.length && <CodeEditor
                value={fileContentsRef}
                ref={textRef as Ref<HTMLTextAreaElement>}
                language="js"
                placeholder="Please enter JS code."
                onChange={(evn) => setFileContentsRef(evn.target.value)}
                style={{
                  fontSize: 12,
                  backgroundColor: 'transparent',
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
