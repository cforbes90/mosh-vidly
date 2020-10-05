import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    account: { username: "", password: "" },
  };
  // componentDidMount() {
  //   this.username.current.focus();
  // }

  handleSubmit = (e) => {
    //this prevents the default behavior of the form. It wants to submit to the server and cause a full page reload where we lose all types of data.
    e.preventDefault();
    console.log("submitted");
  };

  //normally we set up e as our parameterand do the e.currentTarge.value thing but we can also destructure it.
  handleChange = ({ currentTarget: input }) => {
    //clone the piece of state you wish to change. right now it is internal to the loginForm so you can use "this"
    const account = { ...this.state.account };
    //set the cloned piece of state equal to the value of the currentTarget. Use bracket notation and name value to make this usable for multiple form elements
    account[input.name] = input.value;
    console.log("Working hard", account[input.name]);

    //finally use our modified clone and object destructuring to modify the original piece of state. If we didn't use the exact same name then we would have to put the state name then colon then whatever variable we use like this.setState({pieceOfState: ourVariableName})
    this.setState({ account });
  };
  render() {
    //use this part to do account destructuring
    const { account } = this.state;
    return (
      <div className="container">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              //Value is set so we know which part of state to update/ to send the input for this form
              value={account.username}
              onChange={this.handleChange}
              autoFocus
              // ref={this.username}
              id="username"
              //name is used so the onChange has an argument to pass to the bracket notation in the handleChange method.
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              //Value is set so we know which part of state to update/ to send the input for this form
              value={account.password}
              onChange={this.handleChange}
              //name is used so the onChange has an argument to pass to the bracket notation in the handleChange method.
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary"> Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
