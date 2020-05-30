import * as React from 'react';

const initialState = {
    type: 'close',
    visible: false,
    title: '',
    message: '',
    okFunc: () => {}
};

export const DialogContext = React.createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return {
        ...initialState
      };
    case 'open':
      return {
        visible: true,
        title: action.title,
        message: action.message,
        okFunc: action.okFunc
      };
    default:
      throw new Error();
  }
};

export const DialogProvider = ({ children }) => {
  const [dialogState, dispatchDialog] = React.useReducer(reducer, initialState);
  return (
    <DialogContext.Provider
      value={{
        dialogState,
        dispatchDialog
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};