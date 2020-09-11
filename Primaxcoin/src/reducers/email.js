const emailReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload || state;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

export default emailReducer;
