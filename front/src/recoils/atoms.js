import { atom } from 'recoil';

// recoil state atom
const states = [];

const insert_recoil = (key, base) => states.push(atom({ key, default: base }));

// common
insert_recoil('SPINEER', false);
insert_recoil('ALERT', { show: false });
insert_recoil('CONFIRM', { show: false });

// modal
insert_recoil('MODAL:LOGIN', false);
insert_recoil('MODAL:USERSELECT', { show: false });
insert_recoil('MODAL:ITEMSELECT', { show: false });

// account
insert_recoil('CONFIG:ACCOUNT', {
  user: {
    login_id: '',
    nick: '',
    aidx: 0,
  },
  email: '',
  grade: -1,
  name: '',
});

export default states;
