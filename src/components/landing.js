import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';
import AlertMessage from './alert_message';

class Landing extends Component {
  renderField(field) {
    // console.log(field);
    const { meta : { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderRadioField(field) {
    // console.log(field);
    const { meta : { submitFailed, error } } = field;
    const className = `form-group ${submitFailed && error ? 'has-danger': ''}`;

    return (
      <div className={className}>
        <label>{field.label}: </label>{' '}
        <label><Field name="isLucky" component="input" type="radio" value="Yes"/> Yes </label>{' '}
        <label><Field name="isLucky" component="input" type="radio" value="No"/> No</label>
        <div className="text-help">
          {submitFailed ? error : ''}
        </div>
      </div>
    );
  }

  renderSelectField(field) {
    const { meta : { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <select 
          type="select"
          className="form-control"
          {...field.input}
        >
        {this.createStateOptionField()}
        </select>
        
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  createStateOptionField() {
        const states = ["","Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"];

        return states.map((usState) => {
          return (
            <option key={usState} value={usState}>{usState}</option>
          );
        });
  }


  onSubmit(values) {
    this.props.createMessage(values);

  }
  
  render() {
    const { handleSubmit, message } = this.props;

    return (
      <div>
        <fieldset>
          <legend>Account Information</legend>
          <AlertMessage />
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field label="First Name" name="first_name" component={this.renderField}></Field>
            <Field label="Last Name" name="last_name" component={this.renderField}></Field>
            <Field label="Email" name="email" component={this.renderField}></Field>
            <Field label="Password" name="password" component={this.renderField}></Field>
            <Field label="Password Confirmation" name="password_confirmation" component={this.renderField}></Field>
            <Field label="Street Address" name="address" component={this.renderField}></Field>
            <Field label="Unit/Apt #" name="unit" component={this.renderField}></Field>
            <Field label="City" name="city" component={this.renderField}></Field>
            <Field label="State" name="state" component={this.renderSelectField.bind(this)}></Field>
            <Field label="I'm feeling lucky (required)" name="lucky" component={this.renderRadioField}></Field>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </fieldset>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.first_name) {
    errors.first_name = 'First Name is required';
  } else if (values.first_name.length < 2) {
    errors.first_name = 'First Name length must be at least 2 characters';
  }

  if (!values.last_name) {
    errors.last_name = 'Last Name is required';
  } else if (values.last_name.length < 2) {
    errors.last_name = 'Last Name length must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!values.email.match(emailRegex)) {
    errors.email = 'Please enter a valid email';
  } 

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = 'Please confirm your password';
  } else if (values.password_confirmation != values.password) {
    errors.password_confirmation = 'Password and password confirmation must match';
  }
  if (!values.address) {
    errors.address = 'Address is required';
  } else if (values.address.length < 5 ) {
    errors.address = 'Address must be at least 5 characters';
  }

  if (!values.state) {
    errors.state = 'Choose a state';
  }

  if (!values.city) {
    errors.city = 'City is required';
  } else if (values.city.length < 2 ) {
    errors.city = 'City must be at least 2 characters';
  }

  if (!values.isLucky) {
    errors.lucky = 'Are you lucky or not?';
  }

  return errors;
}

function mapStateToProps(state) {
  return {message: state.message};
}

export default reduxForm({
  validate,
  form: 'LandingForm'
})(
  connect(mapStateToProps, { createMessage })(Landing)
);