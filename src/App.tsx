import { createTheme, Grid, Paper, ThemeProvider } from "@mui/material";
import "./App.css";
import { FileExplorer } from "./FileExplorer";
import { FilesEditor } from "./FilesEditor/FilesEditor";
import { useSharedState } from "./Contexts/SharedStateContext";
import {
  SplitPane,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
  Divider,
} from "./SplitPanes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={0} sx={{ p: 1, height: "100%" }}>
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>
            <FileExplorer />
          </SplitPaneLeft>
          <Divider className="separator-col" />

          <SplitPaneRight>
            <FilesEditor />
          </SplitPaneRight>
        </SplitPane>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
