import React, { useState, useEffect } from 'react';

import { Table, Button } from 'react-bootstrap';
import Head from 'components/template/Head';
import Footer from 'components/template/Footer';
import Body from 'components/template/Body';
import request from 'util/request';
import { modal } from 'util/com';

import 'styles/User.scss';

import { logger } from 'util/com';

const UserItem = () => {
  const [items, setItems] = useState([]);
  logger.render('UserItem');

  useEffect(() => {
    request.post(`project1`, {}).then((ret) => {
      if (!ret.err) {
        logger.info(ret.data);
        setItems(() => ret.data.data);
      }
    });
  }, []);

  const onModify = (e) => {
    const nodes = e.currentTarget.parentNode.parentNode.childNodes;
    const no = nodes[1].innerText;
    const my_price = nodes[2].innerText;
    const min_price = nodes[3].innerText;
    const link = nodes[4].innerText;
    const price_gap = nodes[5].innerText;

    modal.item_select('overlap', (ret) => {
      modal.alert('info', `(${ret.no}) 아이템 수정`, `${ret.no}를\n 추가하겠습니까?`, () =>
        request
          .post(`project1/modify`, {
            no: no,
            min_price: min_price,
            price_gap: price_gap,
            link: link,
            my_price: my_price,
          })
          .then((ret) => {
            if (!ret.err) {
              logger.info(ret.data.data);
              setItems(() => ret.data.data);
            }
          })
      );
    });
  };
  const onDelete = (e) => {
    const nodes = e.currentTarget.parentNode.parentNode.childNodes;
    const no = nodes[1].innerText;

    modal.alert('info', `(${no})`, '선택한 아이템을 삭제합니다.', () =>
      request.post(`project1/delete`, { no: no }).then((ret) => {
        if (!ret.err) {
          logger.info(ret.data.data);
          setItems(() => ret.data.data);
        }
      })
    );
  };

  const onInsert = () => {
    modal.item_select('overlap', (ret) => {
      modal.alert('info', `(${ret.no}) 아이템 추가`, `${ret.no}를\n 추가하겠습니까?`, () =>
        request
          .post(`project1/insert`, {
            no: ret.no,
            min_price: ret.min_price,
            price_gap: ret.price_gap,
            link: ret.link,
            my_price: ret.my_price,
          })
          .then((ret) => {
            if (!ret.err) {
              logger.info(ret.data.data);
              setItems(() => ret.data.data);
            }
          })
      );
    });
  };

  return (
    <>
      <Head />
      <Body title={`Project1 아이템`}>
        <div className="UserItem">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <Button variant="success" onClick={onInsert}>
                    아이템 추가
                  </Button>
                </th>
                <th>상품 번호</th>
                <th>현재가</th>
                <th>최저가</th>
                <th>최저가 링크</th>
                <th>가격 차이 설정값</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d, key) => (
                <TableItem key={key} d={d} onModify={onModify} onDelete={onDelete} />
              ))}
            </tbody>
          </Table>
        </div>
      </Body>
      <Footer />
    </>
  );
};

const TableItem = React.memo(({ d, onModify, onDelete }) => {
  logger.render('UserItem TableItem : ', d.no);
  return (
    <tr>
      <td>
        <Button variant="primary" onClick={onModify} name={d.no}>
          수정
        </Button>
        <Button variant="secondary" onClick={onDelete} name={d.no}>
          삭제
        </Button>
      </td>
      <td>{d.no}</td>
      <td>{d.my_price}</td>
      <td>{d.min_price}</td>
      <td
        style={{
          maxWidth: '800px',
        }}
      >
        {d.link}
      </td>
      <td>{d.price_gap}</td>
    </tr>
  );
});

export default React.memo(UserItem);
