import React, {Component} from "react";
import query from "../queries/CurrentUser";
import {graphql} from "react-apollo";
import {withRouter} from "react-router-dom";

export default (WrappedComponent) => {
  class requireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push("/login");
      }
    }
    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  return graphql(query)(withRouter(requireAuth));
};
