import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';

import logo from '../../assets/fastfeet-logo.png';

import { loginRequest } from '../../store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton, TextButton } from './styles';

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const handleSubmit = () => {
    dispatch(loginRequest(id));
  };

  return (
    <Container>
      <Image source={logo} tintColor="#fff" />

      <Form>
        <FormInput
          keyboardType="email-address"
          autoCorrect={false}
          autocapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="next"
          value={id}
          onChangeText={setId}
        />

        <SubmitButton onPress={handleSubmit}>
          <TextButton>Entrar no sistema</TextButton>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Login;
