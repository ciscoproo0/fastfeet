import React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

function Loading() {
  return (
    <Container>
      <ReactLoading type="bubbles" color="#999999" />
    </Container>
  );
}

export default Loading;
