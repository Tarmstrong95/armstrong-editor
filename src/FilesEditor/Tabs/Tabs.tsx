import { Cancel } from "@mui/icons-material";
import { Stack, Paper, Typography } from "@mui/material";
import { useSharedState } from "../../Contexts/SharedStateContext";

//NOTE: Look into using tabs from MUI

export const Tabs = () => {
    const {fileInFocus: fileName, setFileContentsRef, setFileInFocus: setFileName} = useSharedState()

    const getFileName = (name: string) => {
        const match = name.match(/([^/]+)\.(\w+)(?:\.(\w+))?$/g);
        if (!match) return "";
        return match[0];
      };

  return (
    <Stack direction={"row"} gap={1} flex={0.5}>
      {!!fileName && <Paper
        sx={{ p: 1, display: "flex", gap: 0.5, alignItems: "center" }}
        elevation={1}
      >
        <Typography>{getFileName(fileName)}</Typography>
        <Cancel
            onClick={() => {
              setFileContentsRef("");
              setFileName("");
            }}
            sx={{ fontSize: 16, cursor: 'pointer' }}
          />
        
      </Paper>}
    </Stack>
  );
};
