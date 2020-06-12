import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import {
  Container,
  Form,
  ProblemDescription,
  SubmitButton,
  SubmitText,
} from './styles';

import Background from '../../../components/Background';

const RegisterProblem = ({ navigation }) => {
  const orderId = navigation.getParam('orderId');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post(`delivery/${orderId}/problems`, {
        description,
      });

      Alert.alert(
        'Sucesso',
        'Problema registrado',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Details'),
          },
        ],
        { cancelable: false }
      );
      setDescription('');
    } catch (err) {
      Alert.alert(
        'Erro no registro',
        'Houve um erro ao registrar o problema, contate o administrador do sistema'
      );
    }
  };

  return (
    <Background>
      <Container>
        <Form>
          <ProblemDescription
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            returnKeyType="next"
            autoCorrect={false}
            value={description}
            onChangeText={setDescription}
          />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Enviar</SubmitText>
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
};

RegisterProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar Problema',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

RegisterProblem.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default RegisterProblem;
