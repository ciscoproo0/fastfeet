import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MdMoreHoriz, MdEdit, MdDelete } from 'react-icons/md';

import history from '../../../services/history';
import { Container, MoreInfo } from './styles';

export default function Action({ deliveryman, handleDelete }) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleDeleteEmitter = () => {
    if (window.confirm('Tem certeza que deseja excluir entregador(a)?')) {
      handleDelete(deliveryman.id);
    }
    setVisible(!visible);
  };

  return (
    <Container>
      <button type="button" onClick={() => handleVisible()}>
        <MdMoreHoriz size={30} color="#c6c6c6" />
      </button>

      <MoreInfo show={visible}>
        <button
          type="button"
          onClick={() =>
            history.push(`entregadores/editar/${deliveryman.id}`, {
              deliveryman,
            })
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
  handleDelete: PropTypes.func.isRequired,
  deliveryman: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
