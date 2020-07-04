import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { MdSearch, MdAdd } from 'react-icons/md';

import { Container } from './styles';
import history from '../../services/history';

export default function Search({ handleSearch }) {
  const menuValue = useSelector((state) => state.menu.menuState);

  const standardCaracteres = (value) => {
    const parsed = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return parsed;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(event.target.value);
    }
  };

  return (
    <Container>
      <form>
        <input
          name="search"
          placeholder={`Buscar por ${menuValue}`}
          onKeyUp={(event) =>
            event.target.value === '' && handleKeyPress(event)
          }
          onKeyPress={(event) => handleKeyPress(event)}
        />
        <MdSearch size={25} color="#9f9f9f" />
        <button
          type="button"
          onClick={() =>
            history.push(
              `/${standardCaracteres(menuValue).toLowerCase()}/editar`,
              { state: null }
            )
          }
        >
          <MdAdd size={25} color="#ffffff" />
          Cadastrar
        </button>
      </form>
    </Container>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
