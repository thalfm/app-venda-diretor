import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { AlertContext } from '../globalState';

const SnackBar = () => {
  const colors = {
    success: '#00C853',
    info: '#FFD600',
    error: '#FF3D00'
  }
  const { alertState, dispatchAlert } = React.useContext(AlertContext);
  const [alertSyle, setAlertStyle] = React.useState({
    backgroundColor: colors.info
  });

  React.useEffect(() => {
    switch (alertState.alertType) {
      case 'info':
        setAlertStyle({
          backgroundColor: colors.info,
          zIndex: 100000000,
          colors: '#FFFFFF'
        });
        break;
      case 'error':
        setAlertStyle({
          backgroundColor: colors.error,
          zIndex: 100000000,
          colors: '#FFFFFF'
        });
        break;
      case 'success':
        setAlertStyle({
          backgroundColor: colors.success,
          zIndex: 100000000,
          colors: '#FFFFFF'
        });
        break;
      default:
        setAlertStyle({
          backgroundColor: colors.info,
          zIndex: 100000000,
          colors: '#FFFFFF'
        });
    }
  }, [alertState]);

  const closeMe = () => {
    dispatchAlert({ type: 'close' });
  };

  return (
    <>
      {typeof alertState.open === 'boolean' && (
        <Snackbar
          style={alertSyle}
          visible={alertState.open}
          onDismiss={() => closeMe()}
          action={{
            label: 'Fechar',
            onPress: () => {
              closeMe()
            },
          }}
        >
          {alertState.message}
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;