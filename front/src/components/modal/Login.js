import React, { useEffect } from 'react';
import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import Recoils from 'recoils';
import com, { logger, modal, navigate } from 'util/com';
import { AiFillMail, AiFillLock } from 'react-icons/ai';
import 'styles/Modal.scss';
import request from 'util/request';
import _ from 'lodash';

const LoginModal = () => {
  const [show, setState] = Recoils.useState('MODAL:LOGIN');
  logger.render('LoginModal : ', show);

  useEffect(() => {}, []);

  const onClose = () => {
    modal.alert('success', '경고', '로그인창은 종료 할수 없습니다.');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const email = e.currentTarget[0].value;
    const password = e.currentTarget[1].value;

    com.storage.setItem('email', email);
    com.storage.setItem('password', password);

    request.post('user/login', { email, password }).then((ret) => {
      if (!ret.err) {
        setState(false);
        Recoils.setState('CONFIG:ACCOUNT', {
          email: ret.data.email,
        });

        navigate('/');
      }
    });

    logger.info(`submit : email = ${email}, password = ${password}`);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" backdrop="static" className="Login">
      <Modal.Header>
        <Modal.Title className="text-primary">관리 페이지 로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} id="login-modal-form">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <AiFillMail />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="id"
              aria-label="id"
              defaultValue={com.storage.getItem('email')}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">
              <AiFillLock />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="password"
              aria-label="password"
              defaultValue={com.storage.getItem('password')}
              aria-describedby="basic-addon2"
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" form="login-modal-form">
          로그인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(LoginModal);
