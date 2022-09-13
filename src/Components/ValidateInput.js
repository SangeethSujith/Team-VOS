export const Validate = (field_name, type, values) => {
    switch (type) {
        case "isEmpty":                  // to check is empty condition
            return validateNULL(field_name, values)
            break;

        case "email":
            return validateEmail(field_name, values)
            break;

        case "password":
            return validatePassword(field_name, values)
            break;

        case "name":
            return validateName(field_name, values)
            break;

        case "mobile":
            return validatePhoneNumber(field_name, values)
            break;
        case "otp":
            return validateOtp(field_name, values)
            break;
        default:
            break;
    }

}


const validateNULL = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validateEmail = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' address is required.';
    } else if (!/\S+@\S+\.\S+/.test(values)) {
        errors = field_name + ' address is invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validatePassword = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    } else if (values.length < 9) {
        errors = field_name + ' is too short.';
    }
    else {
        errors = '';
    }
    return errors;
};
const validateName = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    }
    else if (!/^[a-zA-Z]+$/i.test(values)) {
        errors = field_name + ' is invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validatePhoneNumber = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    } else if (values.length != 9) {
        errors = 'Please check the ' + field_name + '.';
    }
    else if (!/^[0-9]+$/i.test(values)) {
        errors = 'Please check the ' + field_name + '.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validateOtp = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' Invalid.';
    } else if (values.length != 4) {
        errors = field_name + ' Invalid.';
    }
    else if (!/^[0-9]+$/i.test(values)) {
        errors = field_name + ' Invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};
