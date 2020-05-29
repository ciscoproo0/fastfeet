import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MdEdit, MdDelete, MdMoreHoriz } from 'react-icons/md';
import history from '../../../services/history';

import { Container, MoreInfo } from './styles';

export default function Action({ recipient, handleDelete }) {
  const [visible, setVisible] = useState(false);

  function handleDeleteEmitter() {
    if (window.confirm('Tem certeza que deseja excluir destinatário?')) {
      handleDelete(recipient.id);
    }
    setVisible(!visible);
  }

  return (
    <Container show={visible}>
      <button type="button" onClick={() => setVisible(!visible)}>
        <MdMoreHoriz size={30} color="#c6c6c6" />
      </button>
      <MoreInfo show={visible}>
        <button
          type="button"
          onClick={() =>
            history.push(`/destinatarios/editar/${recipient.id}`, { recipient })
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
  recipient: PropTypes.node,
};

Action.defaultProps = {
  recipient: null,
};
