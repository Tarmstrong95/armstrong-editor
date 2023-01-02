import { Grid, Stack, } from "@mui/material";
import { useSharedState } from "../Contexts/SharedStateContext";
import Editor from 'react-simple-code-editor'
import { Tabs } from "./Tabs";
import Prism from 'prismjs'
import 'prismjs/themes/prism-funky.css'
import { Box } from "@mui/system";

export const FilesEditor = () => {
  const { setFileContentsRef, fileContentsRef, fileInFocus, setFileTouched, fileTouched } = useSharedState()


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
    <Grid item xs={10} md={10} >
      <Stack display={'grid'} gridTemplateRows="30px 1fr" height="100%" overflow={'hidden'}>
        <Tabs />
        {!!fileInFocus &&
          <Stack direction={'row'}>
            <Box width={'20px'} sx={{backgroundColor: '#0009', fontSize: '.8rem', paddingRight: 1 }} color="white">
              <ul style={{ listStyle: 'none', margin: 0, width: 20, padding: 0, paddingTop: 20, lineHeight: '1.75em', textAlign: 'right' }}>
                {fileContentsRef.split('\n').map((_, i) => <li key={_}>{i+1}</li>)}
              </ul>
            </Box>
            <Box sx={{
              color: "white",
              maxHeight: '100%',
              overflow: 'auto',
              width: '100%' 
            }}>
              <Editor
              style={{backgroundColor: '#0005'}}
                padding="20px"
                value={fileContentsRef ?? ''}
                highlight={code => {
                  const fileType = getFileExtension(getFileName(fileInFocus))
                  if (!Prism.languages[fileType]) return code
                  return Prism.highlight(code, Prism.languages[getFileTypeForFormatter(fileType)], fileType)
                }}
                onValueChange={(val) => {
                  !fileTouched && setFileTouched(true)
                  setFileContentsRef(val)
                }}

              />
            </Box>i
          </Stack>
        }
      </Stack>
    </Grid>
  )
}



function getFileTypeForFormatter(fileType: string) {
  switch (fileType) {
    case 'rs':
      return 'rust'
    default:
      return fileType
  }
}
