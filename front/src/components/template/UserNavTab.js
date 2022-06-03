import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { navigate, logger } from 'util/com';

const data = [
  { name: '/user/info', desc: '기본정보' },
  { name: '/user/money', desc: '재화' },
  { name: '/user/item', desc: '아이템' },
  { name: '/user/item_unique', desc: '유니크아이템' },
  { name: '/user/avatar', desc: '아바타' },
  { name: '/user/mail', desc: '우편함' },
  { name: '/user/collection', desc: '수집' },
  { name: '/user/achievement', desc: '업적' },
  { name: '/user/world', desc: '월드' },
];
const UserNavTab = ({ active }) => {
  logger.render('UserNavTab');

  useEffect(() => {}, []);

  const onLink = (e) => {
    e.preventDefault();
    const href = e.currentTarget.name;

    if (active !== href) {
      logger.debug('href : ', href);
      navigate(href);
    }
  };

  return (
    <>
      <Nav fill variant="tabs">
        {data.map((d, key) => (
          <NavItem key={key} onLink={onLink} active={active} name={d.name} desc={d.desc} />
        ))}
      </Nav>
      <hr />
    </>
  );
};

const NavItem = ({ onLink, name, desc, active }) => {
  return (
    <Nav.Item>
      <Nav.Link onClick={onLink} active={active === name} name={name}>
        {desc}
      </Nav.Link>
    </Nav.Item>
  );
};

export default React.memo(UserNavTab);
