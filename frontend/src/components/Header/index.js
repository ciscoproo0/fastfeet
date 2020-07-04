import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Items, Profile } from './styles';

import Logo from '../../assets/images/fastfeet-logo.png';

import { menuRegister } from '../../store/modules/menu/actions';
import { logout } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.menu.menuState);

  const handleMenuRegister = (event) => {
    event.target.focus = true;

    dispatch(menuRegister(event.target.id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    'encomendas',
    'entregadores',
    'destinatarios',
    'problemas',
  ];

  useEffect(() => {
    document.getElementById(selected).style.color = '#444444';
  }, [selected]);

  return (
    <Container>
      <img src={Logo} alt="FastFeet" />
      <Items>
        {menuItems.map((item) => (
          <li key={item}>
            <Link
              to={`/${item}`}
              id={`${item}`}
              onClick={(event) => handleMenuRegister(event)}
            >
              {item.toUpperCase()}
            </Link>
          </li>
        ))}
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
