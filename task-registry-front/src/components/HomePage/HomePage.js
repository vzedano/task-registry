import React from "react";
import Button from "@material-ui/core/Button";
import withTaskFetching from "../../hoc/withTaskFetching";
import { Grid, Container } from "@material-ui/core";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import TaskTable from "../TaskTable";

const TASKS_URL = process.env.REACT_APP_TASKS_URL;

const HomePage = ({ tasks }) => (
  <>
    <Container>
      <Grid container style={{ marginTop: "10px" }} spacing={3}>
        <Grid item xs={12} align="center">
          <Link to="/new-task" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Create new task
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <TaskTable tasks={tasks} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  </>
);

export default withTaskFetching(HomePage);
