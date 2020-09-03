export const increment = (multiple) => {
  return {
    type: 'INCREMENT',
    payload: multiple,
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
    payload: multiple,
  };
};

export const logIn = () => {
  return {
    type: 'SIGN_IN',
  };
};

export const logOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};
