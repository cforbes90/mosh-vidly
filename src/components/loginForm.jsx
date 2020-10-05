import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  username = React.createRef();
  //Make sure that the errors map to the username or password field
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  // componentDidMount() {
  //   this.username.current.focus();
  // }
  validate = () => {
    const errors = {};
    const { account } = this.state;
    //Not scalable validation
    if (account.username.trim() === "")
      errors.username = "Username is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";
    console.log(Object.keys(errors).length);
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    //this prevents the default behavior of the form. It wants to submit to the server and cause a full page reload where we lose all types of data.
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    //Call the server
    console.log("submitted");
  };
  //This did say input.name and input.value before but we destructured it
  valdiateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
      //more validation
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required";
      //more validation
    }
  };

  //normally we set up e as our parameterand do the e.currentTarge.value thing but we can also destructure it.
  handleChange = ({ currentTarget: input }) => {
    //Clone the state object
    const errors = { ...this.state.errors };
    //Get an errorMessage from this function to display
    const errorMessage = this.valdiateProperty(input);
    //
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    //clone the piece of state you wish to change. right now it is internal to the loginForm so you can use "this"
    const account = { ...this.state.account };
    //set the cloned piece of state equal to the value of the currentTarget. Use bracket notation and name value to make this usable for multiple form elements
    account[input.name] = input.value;
    console.log("Working hard", account[input.name]);

    //finally use our modified clone and object destructuring to modify the original piece of state. If we didn't use the exact same name then we would have to put the state name then colon then whatever variable we use like this.setState({pieceOfState: ourVariableName})
    this.setState({ account, errors });
  };
  render() {
    //use this part to do account destructuring
    const { account, errors } = this.state;
    return (
      <div className="container">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="PickmeUP Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary"> Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
