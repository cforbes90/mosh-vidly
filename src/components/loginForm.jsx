import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  username = React.createRef();
  //Make sure that the errors map to the username or password field
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  //schema doesn't have to be part of the state because it doesn't change
  schema = {
    //the label function at the end cleans up the message displayed to the user
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  // componentDidMount() {
  //   this.username.current.focus();
  // }

  doSubmit = () => {
    //Call the server
    console.log("submitted");
  };
  render() {
    return (
      <div className="container">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("jumping jehosophat")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
