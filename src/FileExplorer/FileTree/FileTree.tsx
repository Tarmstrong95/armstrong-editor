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
import _ from 'lodash'

export const FileTree = () => {
  const { fileName, setFileInFocus, fileInFocus, setFileContentsRef } =
    useSharedState();
  const [tree, setTree] = React.useState<FileEntry[]>([]);
  const memoTree = React.useMemo(() => tree ?? [], [tree])

  const readFile = async (filePath: string) => {
    if (!filePath) return;
    setFileContentsRef(await readTextFile(filePath));
  };

  const getDirDetails = async (_fileName: string, recursive: boolean, respond: boolean) => {
    const data = await readDir(_fileName, { dir: BaseDirectory.Home, recursive })
    if (respond) return data
    setTree(data)
  }

  React.useEffect(() => {
    if (!fileName) return;
    void getDirDetails(fileName, false, false)
  }, [fileName]);

  React.useEffect(() => {
    if (!fileInFocus) return;
    readFile(fileInFocus);
  }, [fileInFocus]);

  const renderTree = (nodes: FileEntry) => {
    if (nodes.name == 'node_modules') return null // skipping too big
    if (nodes.name == 'package-lock.json') return null // skipping too big
    return (
      <TreeItem
        key={nodes.path}
        nodeId={nodes.path}
        label={nodes.name}
        onClick={async () => {
        // assume its a file if no children property
          if (!nodes?.children) return setFileInFocus(nodes.path)
          // no need to get children if it already contains children
          if (nodes.children.length) return
          // go ahead and fetch all files for this path recursively 
          const data = await getDirDetails(nodes.path as string, true, true)
          // update tree with new data for this node
          setTree(prev => {
            // get the index of the current node from tree
            const foundIdx = _.findIndex(prev, ['name', nodes.name])
            // if it doesnt exist for some reason we'll just call it quits
            if (foundIdx < 0) return prev
            // mutate the object in place
            _.update(prev[foundIdx], 'children', () => data)
            // shallow copy data to modify its referential integrity and trigger an update
            return [...prev] 
          })
        }}
      >
        {(() => {
          if (!Array.isArray(nodes.children)) return null
          // returning an array with undefined so this node will have the nice expander arrow so users know this is a directory
          if (!nodes.children.length) return [undefined]
          // recursively create children
          return nodes.children.map(node => renderTree(node))
        })()}
      </TreeItem>
    )
  }


  return (
    <TreeView
      aria-label="TreeViewOfFiles"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[fileName]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "100%",
        maxWidth: "100%",
        overflowY: "auto",
        overflowX: 'hidden',
        py: 2
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
          marginLeft: 0,
          color: theme => theme.palette.text.primary,
          ".MuiTreeItem-label": { fontSize: "12px !important" },
          ".MuiTreeItem-group": { marginLeft: 1 },
          ".MuiCollapse-wrapperInner": { borderLeft: '1px solid rgb(177, 177, 177)' }
        }}
      >
        {memoTree?.map?.((item) => renderTree(item))}
      </TreeItem>
    </TreeView>
  );
};
