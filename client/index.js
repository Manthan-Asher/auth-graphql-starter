import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, {createNetworkInterface} from "apollo-client";
import {ApolloProvider} from "react-apollo";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import App from "./components/App";
import SignupForm from "./components/SignupForm";
import requireAuth from "./components/requireAuth";

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin",
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <div className="container">
            <Header />
            <Route exact path="/" component={requireAuth(App)} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
          </div>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
