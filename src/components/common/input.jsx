import React from "react";
//Did destructuring from the props passed in on the parent element
const Input = ({ type, name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //Value is set so we know which part of state to update/ to send the input for this form
        value={value}
        onChange={onChange}
        // ref={this.username}
        id={name}
        //name is used so the onChange has an argument to pass to the bracket notation in the handleChange method.
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
