import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../../../utils';
import useClientStore from '../../clientStore/useClientStore';
import {
  Home,
  Instructions,
  ResetPassword,
  Support,
  ConfirmTicket,
  UserTickets,
  UserProfile,
} from '../../screens';

const MainRoutes: React.FC = () => {
  const { loggedUser } = useClientStore();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='instructions' element={<Instructions />} />
        <Route path='support' element={<Support />} />
        <Route path='reset-password' element={<ResetPassword />} />
        {loggedUser ? (
          <>
            <Route path='user/predictions' element={<UserTickets />} />
            <Route path='user/profile' element={<UserProfile />} />
          </>
        ) : null}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
      <Route path='confirm-ticket' element={<ConfirmTicket />} />
    </Routes>
  );
};

export default MainRoutes;
