import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequest } from '../../store/modules/auth/actions';
import { Container, Content } from './styles';

import Logo from '../../assets/images/fastfeet-logo.png';

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById('submit').disabled = true;
    dispatch(loginRequest(email, password, loading));
  };

  return (
    <Container>
      <Content>
        <div>
          <img src={Logo} alt="FastFeet" />

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Seu E-Mail
              <input
                type="email"
                id="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(event) => handleEmail(event)}
              />
            </label>
            <label htmlFor="password">
              Sua Senha
              <input
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(event) => handlePassword(event)}
              />
            </label>
            <button type="submit" id="submit" disabled={loading}>
              Entrar no Sistema
            </button>
          </form>
        </div>
      </Content>
    </Container>
  );
}
