import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { MdMoreHoriz, MdRemoveRedEye, MdDelete } from 'react-icons/md';

import { Container, MoreInfo } from './styles';

import { problemsState } from '../../../store/modules/modal/actions';

export default function Action({ handleCancelOrder, handleModal, problem }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  function handleShowModal() {
    handleModal(true);
    setVisible(!visible);
    dispatch(problemsState(problem));
  }

  async function handleCancelOrderEmitter() {
    if (window.confirm('Tem certeza que deseja cancelar esta encomenda?')) {
      handleCancelOrder(problem.delivery_id);
    }
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={() => setVisible(!visible)}>
        <MdMoreHoriz size={30} color="#c6c6c6" />
      </button>
      <MoreInfo show={visible}>
        <button type="button" onClick={() => handleShowModal()}>
          <MdRemoveRedEye size={15} color="#4d85ee" />
          Visualizar
        </button>
        <button type="button" onClick={() => handleCancelOrderEmitter()}>
          <MdDelete size={15} color="#de3b3b" />
          Encerrar encomenda
        </button>
      </MoreInfo>
    </Container>
  );
}

Action.propTypes = {
  handleCancelOrder: PropTypes.func.isRequired,
  handleModal: PropTypes.func.isRequired,
  problem: PropTypes.node.isRequired,
};
