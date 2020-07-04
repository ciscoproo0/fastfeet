import React from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { NavigationButtons } from './styles';

export default function Pagination({
  pageCurrent,
  nextPage,
  previousPage,
  stateLength,
}) {
  return (
    <NavigationButtons>
      <button type="button" disabled={pageCurrent <= 1} onClick={previousPage}>
        <MdKeyboardArrowLeft size={30} />
      </button>
      <button type="button" disabled={stateLength < 20} onClick={nextPage}>
        <MdKeyboardArrowRight size={30} />
      </button>
    </NavigationButtons>
  );
}

Pagination.propTypes = {
  pageCurrent: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  stateLength: PropTypes.number.isRequired,
};
