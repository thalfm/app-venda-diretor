import * as React from 'react';

const initialState = {
    type: 'close',
    visible: false
};

export const SpinnerContext = React.createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return {
        ...initialState
      };
    case 'open':
      return {
        visible: true
      };
    default:
      throw new Error();
  }
};

export const SpinnerProvider = ({ children }) => {
  const [spinnerState, dispatchSpinner] = React.useReducer(reducer, initialState);
  return (
    <SpinnerContext.Provider
      value={{
        spinnerState,
        dispatchSpinner
      }}
    >
      {children}
    </SpinnerContext.Provider>
  );
};