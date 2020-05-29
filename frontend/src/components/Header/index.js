import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, Items, Profile } from './styles';

import Logo from '../../assets/images/fastfeet-logo.png';

import { menuRegister } from '../../store/modules/menu/actions';
import { logout } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleMenuRegister(event) {
    event.target.focus = true;

    dispatch(menuRegister(event.target.id));
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <img src={Logo} alt="FastFeet" />
      <Items>
        <li>
          <Link
            to="/encomendas"
            id="Encomendas"
            onClick={(event) => handleMenuRegister(event)}
          >
            ENCOMENDAS
          </Link>
        </li>
        <li>
          <Link
            to="/entregadores"
            id="Entregadores"
            onClick={(event) => handleMenuRegister(event)}
          >
            ENTREGADORES
          </Link>
        </li>
        <li>
          <Link
            to="/destinatarios"
            id="Destinatários"
            onClick={(event) => handleMenuRegister(event)}
          >
            DESTINATÁRIOS
          </Link>
        </li>
        <li>
          <Link
            to="/problemas"
            id="Problemas"
            onClick={(event) => handleMenuRegister(event)}
          >
            PROBLEMAS
          </Link>
        </li>
      </Items>
      <Profile>
        <strong>Admin FastFeet</strong>
        <button type="button" onClick={() => handleLogout()}>
          sair do sistema
        </button>
      </Profile>
    </Container>
  );
}
