import { createTheme, ThemeProvider } from "@mui/material";
import { Box, Stack } from "@mui/system";
import "./App.css";
import { FileExplorer } from "./FileExplorer";
import { FilesEditor } from "./FilesEditor/FilesEditor";
import {
  SplitPane,
  SplitPaneLeft,
  SplitPaneRight,
  Divider,
  SplitPaneTop,
  SplitPaneBottom,
} from "./SplitPanes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack display={'grid'} gridTemplateRows={'1fr 20px'} height={'100vh'}>
          <SplitPane style={{overflowY: 'auto'}} className="split-pane-row">
            <SplitPaneLeft>
              <FileExplorer />
            </SplitPaneLeft>

            <Divider className="separator col" />

            <SplitPaneRight >
              <FilesEditor />
            </SplitPaneRight>
          </SplitPane>
        <Box sx={{display: 'flex', alignItems: 'center', color: 'white',fontSize: '.8rem', width: "100%", backgroundColor: '#0007', px: 1, boxSizing: 'border-box', overflow: 'hidden'}}>
          Something
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
