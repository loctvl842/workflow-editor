import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { RootState } from "@store";
import { ILog, selectAllLogs } from "@store/log.slice";
import { useState } from "react";
// import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";

export const Logger = () => {
  const logs = useSelector<RootState, ILog[]>((state) => selectAllLogs(state));

  return (
    <Paper
      elevation={3}
      style={{
        padding: 16,
        maxWidth: 600,
        margin: "auto",
        marginTop: 20,
        maxHeight: 600,
        overflow: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Workflow Run Logs
      </Typography>

      {/* Display Logs */}
      {logs.map((log, index) => (
        <Box key={index}>
          <SyntaxHighlighter language="javascript">
            {JSON.stringify(log, null, 2)}
          </SyntaxHighlighter>
          <Divider />
        </Box>
      ))}
    </Paper>
  );
};
