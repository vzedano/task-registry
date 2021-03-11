import { Button, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const TASKS_URL = process.env.REACT_APP_TASKS_URL;

var theme = createMuiTheme({
  overrides: {
    // MUIDataTableBodyRow: { root: { height: "0.1rem" } },
    MUIDataTableBodyCell: {
      root: {
        padding: "0.1rem",
        fontFamily: 'Courier, "Lucida Console", monospace',
        // fontSize: "100%",
      },
    },
  },
});

const handleDelete = async (e, id) => {
  e.preventDefault();
  if (window.confirm("Do you really want to delete this task?")) {
    console.log("Called delete on task " + id);
    fetch(`${TASKS_URL}/tasks/${id}`, {
      method: "DELETE",
    }).then(document.location.reload());
  }
};

let options = {
  rowsPerPage: "100",
};

let columns = [
  {
    name: "_id",
    options: {
      display: "false",
    },
  },
  {
    name: "name",
    label: "Task name",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        let displayValue =
          value.length >= 20 ? `${value.substring(0, 20)}...` : value;
        return displayValue;
      },
    },
  },
  {
    name: "info",
    label: "Task information",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        let displayValue =
          value.length >= 40 ? `${value.substring(0, 40)}...` : value;
        return displayValue;
      },
    },
  },
  {
    name: "updated_date",
    label: "Last Updated",
    options: {
      sort: true,
      sortDirection: "desc",
      customBodyRender: (value, tableMeta, updateValue) =>
        new Date(Date.parse(value)).toLocaleString(),
    },
  },
  {
    name: "actions",
    label: "Action",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        // Destructuring the array in the elements it has
        const [id, name, info] = tableMeta.rowData;
        return (
          <Grid container alignContent="center">
            <Grid item>
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/edit-task",
                  state: {
                    id: id,
                    name: name,
                    info: info,
                  },
                }}
              >
                <Button variant="contained" size="small">
                  Edit task
                </Button>
              </Link>
            </Grid>
            &nbsp;
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => handleDelete(e, id)}
                size="small"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        );
      },
    },
  },
];

export default ({ tasks }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable columns={columns} data={tasks} options={options} />
    </MuiThemeProvider>
  );
};
