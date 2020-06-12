import React from 'react';
import PropTypes from 'prop-types';

import { Container, ProblemDetails, Date } from './styles';

const Problem = ({ problems }) => {
  return (
    <Container>
      <ProblemDetails>{problems.description}</ProblemDetails>
      <Date>{problems.createdDateFormatted}</Date>
    </Container>
  );
};

Problem.propTypes = {
  problems: PropTypes.instanceOf(Object).isRequired,
};

export default Problem;
