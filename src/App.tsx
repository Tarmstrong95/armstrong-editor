import { createTheme, Grid, Paper, ThemeProvider } from "@mui/material";
import "./App.css";
import { FileExplorer } from "./FileExplorer";
import { FilesEditor } from "./FilesEditor/FilesEditor";
import { useSharedState } from "./Contexts/SharedStateContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { setFileContentsRef } = useSharedState();

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={0} sx={{ p: 1, height: "100%" }}>
        <Grid container wrap="nowrap" gap={2}>
          <FileExplorer />

          <FilesEditor />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
