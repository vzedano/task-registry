import { Button, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const TASKS_URL = process.env.REACT_APP_TASKS_URL;

const handleDelete = async (e, id) => {
  e.preventDefault();
  console.log("Called delete on task " + id);
  fetch(`${TASKS_URL}/tasks/${id}`, {
    method: "DELETE",
  }).then(document.location.reload());
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
  { name: "name", label: "Task name" },
  {
    name: "info",
    label: "Task information",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        let displayValue =
          value.length >= 50 ? `${value.substring(0, 50)}...` : value;
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
          <Grid container spacing={2} alignContent="center">
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
                <Button variant="contained" color="primary">
                  Edit task
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => handleDelete(e, id)}
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
  return <MUIDataTable columns={columns} data={tasks} options={options} />;
};
