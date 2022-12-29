import { Grid, Paper, Typography, Divider, Button } from "@mui/material"
import { open } from '@tauri-apps/api/dialog'
import { readTextFile } from "@tauri-apps/api/fs"
import { useSharedState } from "../Contexts/SharedStateContext"


export const FileExplorer = () => {
    const {setFileName, setFileContentsRef, fileContentsRef} = useSharedState()

    const readFile = async (filePath: string) => {
        if (!filePath) return;
        setFileContentsRef(await readTextFile(filePath));
      };

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
        if (typeof selectedPath === 'string') {
          setFileName(selectedPath)
          await readFile(selectedPath)
        }
        else {
          alert('Cannot open this file')
        }
      }

    return (
        <Grid item xs={2} md={2} minWidth={150} >
            <Paper sx={{ p: 2, height: '90vh' }} elevation={1}>
              <Typography>Explorer</Typography>
              <Divider/>
              { !fileContentsRef && <Button onClick={getFile} size="small" variant="contained" fullWidth sx={{ mt: 1 }}>Open File</Button>}
            </Paper>
          </Grid>
    )
}