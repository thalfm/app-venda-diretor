import * as React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { SpinnerContext } from '../globalState';
import styled from 'styled-components';

const Box = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const DialogBar = () => {

    const { spinnerState } = React.useContext(SpinnerContext);
  
    return (
      <>
        {typeof spinnerState.visible === 'boolean' && (
             <Modal
                transparent={true}
                animationType= "fade"
                visible={spinnerState.visible}
            >
                <Box>
                    <ActivityIndicator size="large" color="#0000ff" />
                </Box>
            </Modal>
        )}
      </>
    );
  };
  
  export default DialogBar;