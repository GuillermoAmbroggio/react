import React, { useEffect } from 'react';
import './utils/axiosConfig/axiosConfig';
import { useCachedResources } from './utils';
import useClientStore from './components/clientStore/useClientStore';
import { MainRoutes } from './components/routes';
import 'antd/dist/reset.css';
import { SpinerScreen } from './components/commons';
import { notification as antdNotification } from 'antd';

const App: React.FC = () => {
  const [api, contextHolder] = antdNotification.useNotification();
  const { notification } = useClientStore();
  const isLoadingComplete = useCachedResources();
  useEffect(() => {
    if (notification) {
      api[notification.status]({
        message: notification.message,
        description: notification.description,
        placement: 'top',
      });
    }
  }, [notification]);
  if (!isLoadingComplete) {
    return <SpinerScreen />;
  }
  return (
    <>
      {contextHolder}
      <MainRoutes />
    </>
  );
};

export default App;
