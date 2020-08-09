import React, {Component} from "react";
import AuthForm from "./AuthForm";
import {graphql} from "react-apollo";
import mutation from "../mutations/Signup";
import query from "../queries/CurrentUser";
import {withRouter} from "react-router-dom";

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {errors: []};
  }
  onSubmit({email, password}) {
    this.props
      .mutate({
        variables: {email, password},
        refetchQueries: [{query}],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({errors});
      });
  }
  componentWillUpdate(nextprops) {
    if (!this.props.data.user && nextprops.data.user) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(withRouter(SignupForm)));
