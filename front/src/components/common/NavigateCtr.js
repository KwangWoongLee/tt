import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from 'util/com';
export const navigate_ref = React.createRef();

const NavigateCtr = () => {
  logger.render('NavigateCtr');

  const navigate = useNavigate();

  navigate_ref.current = navigate;

  return null;
};

export default NavigateCtr;
