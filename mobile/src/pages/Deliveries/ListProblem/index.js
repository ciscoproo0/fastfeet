import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import { Container, Problems, Title } from './styles';

import Background from '../../../components/Background';
import Problem from '../../../components/Problem';

const ListProblem = ({ navigation }) => {
  const orderId = navigation.getParam('orderId');
  const [problems, setProblem] = useState([]);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const { data } = await api.get(`delivery/${orderId}/problems`);

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const newProblems = data.map((res) => ({
          ...res,
          createdDateFormatted:
            res?.createdAt &&
            format(
              utcToZonedTime(new Date(res.createdAt), timezone),
              'dd/MM/yyyy',
              { locale: pt }
            ),
        }));

        setProblem(newProblems);
      } catch (err) {
        Alert.alert(
          'Erro na listagem',
          `Ocorreu um erro ao listar problemas, contate o desenvolvedor do sistema${err}`
        );
      }
    };
    getProblems();
  }, []);

  return (
    <Background>
      <Container>
        <Title>Encomenda 01</Title>

        <Problems
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Problem problems={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
};

ListProblem.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar Problemas',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

ListProblem.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default ListProblem;
