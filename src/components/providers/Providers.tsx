import { ConfigProvider } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import theme from '../../theme';
import ReactQueryProvider from './reactQueryProvider/ReactQueryProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
const { REACT_APP_CLIENT_ID_GOOGLE } = process.env;

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <GoogleOAuthProvider clientId={REACT_APP_CLIENT_ID_GOOGLE || ''}>
            {children}
          </GoogleOAuthProvider>
        </ConfigProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
};

export default Providers;
