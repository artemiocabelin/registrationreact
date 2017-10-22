import { FIELDS } from '../models/fields';

export default function validate(values) {
  const errors = {};
  const exceptions = ['unit','lucky'];

  _.each(FIELDS, (type, field) => {
    if (!exceptions.includes(field)) {
      if (!values[field]) {
        errors[field] = `${type.label} is required`;
      } else {
        errors[field] = type.validate(values[field], values);
      }
    }
  });

  if (!values.isLucky) {
    errors.lucky = 'Are you lucky or not?';
  }

  return errors;
}