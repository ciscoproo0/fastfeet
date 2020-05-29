import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { MdRemoveRedEye, MdEdit, MdDelete, MdMoreHoriz } from 'react-icons/md';

import { detailsState } from '../../../store/modules/modal/actions';
import history from '../../../services/history';

import { Container, MoreInfo } from './styles';

export default function Action({ order, handleModal, handleDelete }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  function handleModalEmitter() {
    dispatch(detailsState(order));
    handleModal(true);
    setVisible(!visible);
  }

  function handleDeleteEmitter() {
    if (window.confirm('Tem certeza que deseja excluir esta encomenda?')) {
      handleDelete(order.id);
    }
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={() => setVisible(!visible)}>
        <MdMoreHoriz size={30} color="#c6c6c6" />
      </button>
      <MoreInfo show={visible}>
        <button type="button" onClick={() => handleModalEmitter()}>
          <MdRemoveRedEye size={15} color="#7d40e7" />
          Visualizar
        </button>
        <button
          type="button"
          onClick={() =>
            history.push(`/encomendas/editar/${order.id}`, { order })
          }
        >
          <MdEdit size={15} color="#4d85ee" />
          Editar
        </button>
        <button type="button" onClick={() => handleDeleteEmitter()}>
          <MdDelete size={15} color="#de3b3b" />
          Excluir
        </button>
      </MoreInfo>
    </Container>
  );
}

Action.propTypes = {
  handleModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
  }),
};

Action.defaultProps = {
  order: null,
};
