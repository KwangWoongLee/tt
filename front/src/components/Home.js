import React, { useEffect } from 'react';

import 'styles/Home.scss';
import Head from 'components/template/Head';
import Footer from 'components/template/Footer';
import Body from 'components/template/Body';
import { logger, modal } from 'util/com';

const Home = () => {
  logger.render('Home');

  useEffect(() => {
    // const email = com.storage.getItem('email');
    // const password = com.storage.getItem('password');
    // const account = Recoils.getState('CONFIG:ACCOUNT');
    // if (email && password && account.grade === -1) {
    //   modal.login();
    // }
  }, []);

  const onClick = () => {
    //modal.item_select('unique', (ret) => console.log('select item = ', ret));
  };

  return (
    <>
      <Head />
      <Body title={`ver ${process.env.REACT_APP_VERSION}`} className="Home">
        <p>
          <strong className="text-success">프로젝트 운영툴 입니다. </strong>
        </p>
      </Body>
      <Footer />
    </>
  );
};

for (const name in process.env) {
  logger.info(`${name} = ${process.env[name]}`);
}

export default React.memo(Home);
