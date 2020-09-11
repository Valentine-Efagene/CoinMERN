const logIn = (email) => {
  return {
    type: 'LOG_IN',
    payload: email,
  };
};

const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

export { logIn, logOut };
