import React, { useEffect } from 'react';
import { Button, Navbar, Nav, NavDropdown, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import 'styles/Template.scss';
import { navigate, modal, logger } from 'util/com';

import request from 'util/request';
import Recoils from 'recoils';

const Head = () => {
  logger.render('Template Head');
  const account = Recoils.useValue('CONFIG:ACCOUNT');
  const AccountReset = Recoils.useResetState('CONFIG:ACCOUNT');

  useEffect(() => {}, []);

  const onLink = (e) => {
    e.preventDefault();
    const href = e.currentTarget.name;
    logger.debug('href : ', href);
    navigate(href);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <div className="Head d-flex justify-content-between">
          <Nav>
            <Nav.Link onClick={onLink} name="/project1">
              프로젝트1
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default React.memo(Head);
