import * as React from 'react';
import { AlertProvider } from './alert-provider';
import { DialogProvider } from './dialog-provider';

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer contexts={[<AlertProvider />, <DialogProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export default ContextProvider;