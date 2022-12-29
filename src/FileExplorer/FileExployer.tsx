import { Grid, Paper, Typography, Divider, Button } from "@mui/material";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { useSharedState } from "../Contexts/SharedStateContext";
import { FileTree } from "./FileTree";

export const FileExplorer = () => {
  const { setFileName, setFileContentsRef, fileContentsRef, fileName } = useSharedState();

  const getFile = async () => {
    let selectedPath: string | string[] | null = "";
    try {
      selectedPath = await open({
        directory: true,
        multiple: false,
        title: "Open a file",
      });
    } catch (err) {
      console.error(err);
    }
    if (typeof selectedPath === "string") {
      setFileName(selectedPath);
    } else {
      alert("Cannot open this file");
    }
  };

  return (
    <Grid item xs={2} md={2} minWidth={150}>
      <Paper sx={{ p: 2, height: "90vh" }} elevation={1}>
        <Typography>Explorer</Typography>
        <Divider />
        {!fileName && (
          <Button
            onClick={getFile}
            color='warning'
            size="small"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Open File
          </Button>
        )}

        {!!fileName && <FileTree/> }
      </Paper>
    </Grid>
  );
};
