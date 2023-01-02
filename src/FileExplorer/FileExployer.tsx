import { Grid, Paper, Typography, Divider, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { open } from "@tauri-apps/api/dialog";
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
        title: "Open a folder",
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
      <Container maxWidth='md' sx={{ pt: 1 }}>
        <Typography mb={3} variant='h6' fontWeight={'bold'} color={"textPrimary"}>Explorer</Typography>


        {!fileName && (
          <Stack alignItems={'center'} gap={1}>
            <Typography textAlign={'center'} color={"textPrimary"}>You have not opened a directory yet!</Typography>
            <Button
              onClick={getFile}
              color='primary'
              size="small"
              variant="contained"
              sx={{ mt: 1, width: '100%', maxWidth: 200 }}
            >
              Open File
            </Button>
          </Stack>
        )}

        {!!fileName && <FileTree />}
      </Container>
  );
};
