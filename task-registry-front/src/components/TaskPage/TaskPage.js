import React from "react";

import { FormControl, TextField, Button, Grid } from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";
import { useHistory } from "react-router-dom";

const TASKS_URL = process.env.REACT_APP_TASKS_URL;

export default (props) => {
  const inputId = props?.location?.state?.id;

  const initialName = props?.location?.state?.name;
  const initialInfo = props?.location?.state?.info;

  const [name, setName] = React.useState(inputId ? initialName : "N/A");
  const [info, setInfo] = React.useState(inputId ? initialInfo : "N/A");

  const history = useHistory();

  const headers = { "Content-Type": "application/json" };

  const getBody = () =>
    JSON.stringify({
      name: name,
      info: info,
    });

  let createTask = async (e) => {
    e.preventDefault();
    console.log("Create task has been called.");

    const body = await fetch(`${TASKS_URL}/tasks`, {
      method: "POST",
      body: getBody(),
      redirect: "follow",
      headers: headers,
    });
    history.push("/");
  };

  let updateTask = async (e) => {
    e.preventDefault();
    console.log("Update task has been called.");

    await fetch(`${TASKS_URL}/tasks/${inputId}`, {
      method: "PUT",
      body: getBody(),
      redirect: "follow",
      headers: headers,
    });
    history.push("/");
  };

  let handleNameChange = (e) => {
    setName(e.target.value);
  };

  let handleInfoChange = (e) => {
    setInfo(JSON.stringify(convertToRaw(e.getCurrentContent())));
  };

  const fontFamily = 'Courier, "Lucida Console", monospace';

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      style={{ marginTop: "5px" }}
    >
      <Grid item xs={12}>
        <h3>
          {inputId ? `Updating task: ${initialName}` : "Creating a new task"}
        </h3>
      </Grid>
      <Grid item xs={8}>
        <form onSubmit={props?.location?.state?.id ? updateTask : createTask}>
          <FormControl fullWidth>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Task name"
                  fullWidth
                  onChange={handleNameChange}
                  autoFocus
                  defaultValue={inputId ? name : ""}
                  InputProps={{
                    style: {
                      fontFamily: fontFamily,
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} align="left">
                <div style={{ minHeight: "85px" }}>
                  <MUIRichTextEditor
                    defaultValue={inputId ? initialInfo : ""}
                    label="Task information (multiline)"
                    onChange={handleInfoChange}
                  ></MUIRichTextEditor>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  {inputId ? "Update" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
