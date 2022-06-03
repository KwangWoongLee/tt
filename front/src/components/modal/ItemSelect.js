import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Stack, Dropdown, Table, Container, Row, Col } from 'react-bootstrap';
import Recoils from 'recoils';
import com, { logger, useInput, modal } from 'util/com';
import 'styles/Modal.scss';
import _ from 'lodash';

// 나중에 react-virtualized 혹은 react-window 이용해서 가상화 해주자, 너무 느리다.

const ItemSelectModal = () => {
  const [state, setState] = Recoils.useState('MODAL:ITEMSELECT');
  const input_no = useRef(null);
  const input_min_price = useRef(null);
  const input_price_gap = useRef(null);

  logger.render('ItemSelectModal : ', state.show);

  useEffect(() => {}, []);

  const onClose = () => {
    setState({ ...state, show: false, type: undefined, cb: undefined });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const no = input_no.current.value;
    const min_price = Number(input_min_price.current.value);
    const price_gap = Number(input_price_gap.current.value);

    if (!no) return modal.alert('error', '아이템이 선택되지 않았습니다.');
    if (!min_price) return modal.alert('error', '갯수값이 입력되지 않았습니다.');
    if (!price_gap) return modal.alert('error', '갯수값이 입력되지 않았습니다.');

    if (state.cb) {
      state.cb({
        no,
        min_price,
        price_gap,
      });
    }

    onClose();
  };

  return (
    <Modal show={state.show} onHide={onClose} backdrop="static" dialogClassName="modal-90w" className="ItemSelect">
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">
          <h4>아이템 선택</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={3}>
              <Form onSubmit={onSubmit} id="item-modal-form">
                <Form.Group className="mb-3">
                  <Form.Label>상품 번호</Form.Label>
                  <Form.Control ref={input_no} type="text" placeholder="상품 번호" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>최저가</Form.Label>
                  <Form.Control ref={input_min_price} type="text" placeholder="최저가" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>가격 차이 설정값</Form.Label>
                  <Form.Control ref={input_price_gap} type="number" placeholder="가격 차이 설정값" />
                </Form.Group>
              </Form>
              <hr />
              <div className="d-flex justify-content-around">
                <Button variant="primary" type="submit" form="item-modal-form">
                  추가
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  취소
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(ItemSelectModal);
