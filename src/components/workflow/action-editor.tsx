import { useActionTemplates } from "@hooks/workflow/useActionTemplates";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { IAction, updateAction } from "@store/action.slice";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState, FormEventHandler } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { JsonEditor } from "react-jsondata-editor";
import { AppDispatch } from "@store";
import { useDispatch } from "react-redux";

const EditableSyntaxHighlighter = ({ value, onChange }) => {
  const [jsonString, setJsonString] = useState("");

  useEffect(() => {
    // Convert the JSON value to a string
    setJsonString(JSON.stringify(value, null, 2));
  }, [value]);

  const editableRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (e: any) => {
    const textContent = e.target.textContent;

    const result = _.attempt(JSON.parse.bind(null, textContent));
    if (!_.isError(result)) {
      onChange(JSON.parse(e.target.textContent));
    }
  };

  return (
    <Box contentEditable ref={editableRef} onInput={handleInput}>
      <SyntaxHighlighter language="javascript">{jsonString}</SyntaxHighlighter>
      {/* <JsonEditor jsonObject={jsonString} onChange={setJsonString} /> */}
    </Box>
  );
};

interface ActionEditorProps {
  action: IAction;
  open: boolean;
  onClose: () => void;
}

export const ActionEditor = (props: ActionEditorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { action, open, onClose } = props;
  const templates = useActionTemplates();
  const actionTemplate = action.template;
  const [formData, setFormData] = useState(() => {
    const initialState = {
      name: action.name,
      template: action.template,
      input: action.input,
    };
    return initialState;
  });

  const handleChange =
    (field: string, nestedField?: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => {
        if (nestedField) {
          return {
            ...prevData,
            [field]: {
              ...prevData[field],
              [nestedField]: event.target.value,
            },
          };
        } else {
          return {
            ...prevData,
            [field]: event.target.value,
          };
        }
      });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateAction({ id: action.id, changes: formData }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog
        // fullScreen
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          padding={0}
        >
          <Typography style={{ fontWeight: 600, fontSize: 25 }}>Action Editor</Typography>
          <IconButton onClick={onClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
              fullWidth
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="action-template">Template</InputLabel>
            <Select
              labelId="action-template"
              label="Template"
              value={formData.template}
              renderValue={(value) => value.name}
              onChange={handleChange("template")}
              required
            >
              {templates.map((template) => (
                <MenuItem key={template.id} value={template}>
                  {template.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <Typography variant="subtitle1">Input</Typography>
            <Stack spacing={0} marginLeft={2} marginTop={2}>
              {formData?.template?.inputValidator &&
                Object.keys(formData.template.inputValidator._type).map((key) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    {_.isObject(formData.input?.[key]) ? (
                      <>
                        <Typography>{key}</Typography>
                        <EditableSyntaxHighlighter
                          value={formData.input?.[key]}
                          onChange={(value: any) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              input: {
                                ...prevData.input,
                                [key]: value,
                              },
                            }));
                          }}
                        />
                      </>
                    ) : (
                      <TextField
                        label={key}
                        value={formData.input?.[key]}
                        onChange={handleChange("input", key)}
                        fullWidth
                        required={formData.template.inputValidator._type[key]._required}
                      />
                    )}
                  </div>
                ))}
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};
