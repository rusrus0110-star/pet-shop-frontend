export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address",
  },
};

export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters long",
  },
};

export const phoneValidation = {
  required: "Phone is required",
  minLength: {
    value: 5,
    message: "Phone must be at least 5 characters long",
  },
};
