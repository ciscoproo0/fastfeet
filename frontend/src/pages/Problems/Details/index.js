import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ModalContainer, Content } from './styles';

export default function Details({ handleModal }) {
  const problem = useSelector((state) => state.modal.detailsProblem);

  return (
    <ModalContainer onClick={() => handleModal(false)}>
      <Content>
        <h1>Visualizar Problema</h1>

        <p>{problem.description}</p>
      </Content>
    </ModalContainer>
  );
}

Details.propTypes = {
  handleModal: PropTypes.func.isRequired,
};
