import * as React from 'react';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import { DialogContext } from '../globalState';

const DialogBar = () => {

    const { dialogState, dispatchDialog } = React.useContext(DialogContext);
  
    const closeDialog = () => {
        dispatchDialog({ type: 'close' });
    };
  
    return (
      <>
        {typeof dialogState.visible === 'boolean' && (
          <Dialog
            visible={dialogState.visible}
            onDismiss={closeDialog}>
            <Dialog.Title>
                {dialogState.title}
            </Dialog.Title>
            <Dialog.Content>
                <Paragraph>
                    {dialogState.message}
                </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={(closeDialog)}>Não</Button>
                <Button onPress={dialogState.okFunc}>Sim</Button>
            </Dialog.Actions>
          </Dialog>
        )}
      </>
    );
  };
  
  export default DialogBar;