import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { logger } from 'util/com';
import { Link } from 'react-router-dom';

import 'styles/Template.scss';

const Footer = () => {
  logger.render('Template Footer');
  useEffect(() => {}, []);

  return (
    <>
      <Alert variant="primary" className="Footer">
        <Link to="/">
          <h2>VER {process.env.REACT_APP_VERSION}</h2>
        </Link>
      </Alert>
    </>
  );
};

export default React.memo(Footer);
