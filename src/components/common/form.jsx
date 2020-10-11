import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    //to make the code prettier, we make the options constant, fill it out and pass it to the function
    const options = { abortEarly: false };

    const result = Joi.validate(this.state.data, this.schema, options);
    console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    // const errors = {};
    // const { account } = this.state;
    // //Not scalable validation
    // if (account.username.trim() === "")
    //   errors.username = "Username is required.";

    // if (account.password.trim() === "")
    //   errors.password = "Password is required.";
    // console.log(Object.keys(errors).length);
    // return Object.keys(errors).length === 0 ? null : errors;
  };
  //This did say input.name and input.value before but we destructured it
  valdiateProperty = ({ name, value }) => {
    //Joi validation using "computed properties" these will be set at runtime
    const obj = { [name]: value };
    //"Computed Properties" again to be set at runtime. Really a computed key of the key value pair. Notice the this? That refers to the schema belonging to this class and not this function!
    const schema = { [name]: this.schema[name] };
    //this schema relates to the schema of this validateProperty() function. We don't have the abortEarly here because we dont' want the form screaming at the user.
    const { error } = Joi.validate(obj, schema);
    //Using a ternary operator to instead of an if else
    return error ? error.details[0].message : null;
    // if (error) return null;
    // return error.details[0].message;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    //   //more validation
    // }

    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    //   //more validation
    // }
  };

  handleSubmit = (e) => {
    //this prevents the default behavior of the form. It wants to submit to the server and cause a full page reload where we lose all types of data.
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    //Call the server
    this.doSubmit();
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
    const data = { ...this.state.data };
    //set the cloned piece of state equal to the value of the currentTarget. Use bracket notation and name value to make this usable for multiple form elements
    data[input.name] = input.value;
    console.log("Working hard", data[input.name]);

    //finally use our modified clone and object destructuring to modify the original piece of state. If we didn't use the exact same name then we would have to put the state name then colon then whatever variable we use like this.setState({pieceOfState: ourVariableName})
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  //This is how you give a default value in a parameter
  renderInput(name, label, type = "text") {
    //use this part to do account destructuring
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
