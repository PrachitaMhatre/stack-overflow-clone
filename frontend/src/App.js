import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import StackOverflow from "./components/StackOverflow";
import Question from "./components/AddQuestion/Question";
import ViewQuestion from "./components/ViewQuestion";
import Auth from "./components/Auth";
import { selectUser, login, logout } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import DynamicThemeChange from "./DynamicThemeChange";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  return (
    <div className="App">
      <Router>
        <DynamicThemeChange />
        <Header />
        <Switch>
          {/*<Route exac path={user ? "/" : "/auth"} component={user ? StackOverflow : Auth}/> */}
          <Route exact path="/auth" component={Auth} />
          <PrivateRoute exact path="/add-question" component={Question} />
          <PrivateRoute exact path="/question" component={ViewQuestion} />
          <PrivateRoute exact path="/" component={StackOverflow} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
