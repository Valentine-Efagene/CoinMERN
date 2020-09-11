import { logIn, logOut } from './email.js';

const increment = (multiple) => {
  return {
    type: 'INCREMENT',
    payload: multiple,
  };
};

const decrement = () => {
  return {
    type: 'DECREMENT',
    payload: multiple,
  };
};

export { increment, decrement, logIn, logOut };
