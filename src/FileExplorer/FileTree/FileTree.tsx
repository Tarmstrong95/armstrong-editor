import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useSharedState } from "../../Contexts/SharedStateContext";
import {
  BaseDirectory,
  FileEntry,
  readDir,
  readTextFile,
} from "@tauri-apps/api/fs";

export const FileTree = () => {
  const { fileName, setFileInFocus, fileInFocus, setFileContentsRef } =
    useSharedState();
  const [tree, setTree] = React.useState<FileEntry[]>([]);

  const readFile = async (filePath: string) => {
    if (!filePath) return;
    setFileContentsRef(await readTextFile(filePath));
  };

  React.useEffect(() => {
    if (!fileName) return;
    readDir(fileName as string, { dir: BaseDirectory.Home, recursive: true })
      .then((dirs) => setTree(dirs))
      .catch((err) => console.error(err));
  }, [fileName]);

  React.useEffect(() => {
    if (!fileInFocus) return;
    readFile(fileInFocus);
  }, [fileInFocus]);

  const renderTree = (nodes: FileEntry) => (
    <TreeItem
      key={nodes.path}
      nodeId={nodes.path}
      label={nodes.name}
      onClick={() => !nodes?.children && setFileInFocus(nodes.path)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "100%",
        maxWidth: "100%",
        overflowY: "auto",
        fontSize: "1rem",
      }}
    >
      <TreeItem
        key={fileName}
        nodeId={fileName}
        label={
          fileName?.match(/\/[a-zA-z-]+$/g)?.[0].replace("/", "") ??
          "name failure"
        }
        sx={{
          ".MuiTreeItem-label": { fontSize: ".9rem" },
        }}
      >
        {tree?.map((item) => renderTree(item))}
      </TreeItem>
    </TreeView>
  );
};
