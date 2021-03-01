import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Route } from "react-router-dom";
import TaskPage from "./components/TaskPage/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <Route path="/new-task" component={TaskPage} />
      <Route path="/edit-task" component={TaskPage} />
    </BrowserRouter>
  );
}

export default App;
