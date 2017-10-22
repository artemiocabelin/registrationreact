const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const FIELDS = {
      first_name: {
    type: 'input', 
    label: 'First Name', 
    validate: (value, values) => {
      if (value.length < 2) {
        return 'First Name length must be at least 2 characters';
      }
    }
  },
  last_name: {
    type: 'input', 
    label: 'Last Name',
    validate: (value,values) => {
      if (value.length < 2) {
        return 'Last Name length must be at least 2 characters';
      }
    }
  },
  email: {
    type: 'input', 
    label: 'Email', 
    validate: (value, values) => {
      if (!value.match(emailRegex)) {
          return 'Please enter a valid email';
      }
    }
  },
  password: {
    type: 'input', 
    label: 'Password',
    validate: (value, values) => {
      if (value.length < 8) {
          return 'Password must be at least 8 characters';
      }
    }
  },
  password_confirmation: {
    type: 'input', 
    label: 'Password Confirmation', 
    validate: (value, values) => {
      if (value != values.password) {
        return 'Password and password confirmation must match';
      }
    }
  },
  address: {
    type: 'input', 
    label: 'Street Address', 
    validate: (value, values) => {
      if (value.length < 5 ) {
        return 'Address must be at least 5 characters';
      }
    }
  },
  unit: {
    type: 'input', 
    label: 'Unit/Apt #', 
    validate: (value, values) => {
  
    }
  },
  city: {
    type: 'input', 
    label: 'City', 
    validate: (value, values) => {
      if (values.length < 2 ) {
        return 'City must be at least 2 characters';
      }
    }
  },
  state: {
    type: 'select', 
    label: 'State', 
    validate: (value, values) => {

    }
  },
  lucky: {
    type: 'radio', 
    label: "I'm feeling lucky (required)", 
    validate: (value, values) => {

    }
  }
};