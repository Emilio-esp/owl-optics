const fieldLength = (field, value, size) => {
  if (!value) {
    return {
      isCorrect: false,
      message: `This field is required. Please fill the ${field}`,
    };
  }

  if (value.length <= size) {
    return {
      isCorrect: false,
      message: `the ${field} is to short. Please check your ${field}`,
    };
  } else {
    return {
      isCorrect: true,
      message: "",
    };
  }
};

const email = (field, value) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(value).toLowerCase());

  if (!isValid) {
    return {
      isCorrect: false,
      message: `the ${field} is not Valid. Please check your ${field}`,
    };
  } else {
    return {
      isCorrect: true,
      message: "",
    };
  }
};

const validate = {
  fieldLength,
  email,
};

export default validate;