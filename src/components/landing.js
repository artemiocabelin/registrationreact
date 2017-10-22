import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';
import AlertMessage from './alert_message';
import { FIELDS } from '../models/fields';
import { states } from '../models/us_states';
import validate from '../validations/validation_registration';

class Landing extends Component {

  setFields(fieldConfig, field) {
    if(fieldConfig.type === 'select') {
      return (
        <Field key={field} label={fieldConfig.label} name={field} component={this.renderSelectField.bind(this)}></Field>
      );
    } else if (fieldConfig.type === 'radio') {
      return (
        <Field key={field} label={fieldConfig.label} name={field} component={this.renderRadioField}></Field>
      );
    }
    return (
      <Field key={field} label={fieldConfig.label} name={field} component={this.renderField}></Field>
    );    
  }

  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type="text" className="form-control" {...field.input}/>
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderRadioField(field) {
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
        <select type="select" className="form-control" {...field.input}>
          {this.createStateOptionField()}
        </select>
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  createStateOptionField() {
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
            {_.map(FIELDS, this.setFields.bind(this))}
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </fieldset>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {message: state.message};
}

export default reduxForm({
  validate,
  form: 'LandingForm',
  fields: _.keys(FIELDS)
})(
  connect(mapStateToProps, { createMessage })(Landing)
);