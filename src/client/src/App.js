import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../src/components/Navbar";
import { DetailsPage } from "./pages/DetailsPage";

function App() {
  let history = useHistory();
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/details" exact component={DetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
