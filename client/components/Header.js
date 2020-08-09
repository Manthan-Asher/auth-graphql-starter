import React, {Component} from "react";
import {compose, graphql} from "react-apollo";

import query from "../queries/CurrentUser";
import mutation from "../mutations/Logout";
import {Link} from "react-router-dom";

export class Header extends Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [{query}],
    });
  }

  renderButton() {
    const {loading, user} = this.props.data;
    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogout.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">
          <div className="nav-wrapper">{this.renderButton()}</div>
        </ul>
      </nav>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
