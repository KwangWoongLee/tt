import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from 'components/Home';

import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modals from 'components/modal';

import com, { logger, modal } from 'util/com';
import UserItem from 'components/project/UserItem';

import NavigateCtr from 'components/common/NavigateCtr';

//const Router = process.env.REACT_APP_SSR === '1' ? BrowserRouter : HashRouter;

export function App() {
  logger.render('App');
  useEffect(() => {
    const email = com.storage.getItem('email');
    const password = com.storage.getItem('password');
    if (email && password) {
      modal.login();
    }
    logger.debug('mount App');
  }, []);
  return (
    <RecoilRoot>
      <BrowserRouter>
        <RecoilNexus />
        <NavigateCtr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="project1" element={<UserItem />} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
        <Modals />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
