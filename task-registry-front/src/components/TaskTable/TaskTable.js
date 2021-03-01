import { Button } from "@material-ui/core";
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
    name: "actions",
    label: "Action",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        // Destructuring the array in the elements it has
        const [id, name, info] = tableMeta.rowData;
        return (
          <>
            <Link
              to={{
                pathname: "/edit-task",
                state: {
                  id: id,
                  name: name,
                  info: info,
                },
              }}
            >
              Edit task
            </Link>
            <Button onClick={(e) => handleDelete(e, id)}>Delete</Button>
          </>
        );
      },
    },
  },
];

export default ({ tasks }) => {
  return <MUIDataTable columns={columns} data={tasks} />;
};
