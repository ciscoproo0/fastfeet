import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../../components/Background';
import api from '../../../services/api';

import {
  Container,
  Card,
  Title,
  OrderTitle,
  Wrapper,
  WrapperDate,
  Label,
  TextValue,
  StatusCards,
  WrapperStatus,
  TextStatus,
} from './styles';

const Details = ({ navigation }) => {
  const order = navigation.getParam('order');

  const handleStartDate = async () => {
    try {
      await api.put(`orders/${order.id}/start_date`);

      Alert.alert(
        'Sucesso',
        'Entrega iniciada',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert(
        'Erro na ação',
        `Houve um erro ao registrar a data de início, contate o administrador do sistema${err}`
      );
    }
  };

  return (
    <Background>
      <Container>
        <Card>
          <Title>
            <Icon name="local-shipping" size={30} color="#7d40e7" />

            <OrderTitle>Informações da entrega</OrderTitle>
          </Title>

          <Wrapper>
            <Label>DESTINATÁRIO</Label>
            <TextValue>{order.recipient.name}</TextValue>
          </Wrapper>
          <Wrapper>
            <Label>ENDEREÇO DE ENTREGA</Label>
            <TextValue>
              {`${order.recipient.address}, ${order.recipient.number}, ${order.recipient.city} - ${order.recipient.state}, ${order.recipient.zip_code}`}
            </TextValue>
          </Wrapper>
          <Wrapper>
            <Label>PRODUTO</Label>
            <TextValue>{order.product}</TextValue>
          </Wrapper>
        </Card>

        <Card>
          <Title>
            <Icon name="event" size={30} color="#7d40e7" />

            <OrderTitle>Situação da entrega</OrderTitle>
          </Title>

          <Wrapper>
            <Label>STATUS</Label>
            <TextValue>
              {!order.startDateFormatted
                ? 'Pendente'
                : order.startDateFormatted
                ? 'Retirada'
                : order.endDateFormatted
                ? 'Entregue'
                : null}
            </TextValue>
          </Wrapper>

          <WrapperDate>
            <Wrapper>
              <Label>DATA DE RETIRADA</Label>
              <TextValue>{order.startDateFormatted || '--/--/--'}</TextValue>
            </Wrapper>

            <Wrapper>
              <Label>DATA DE ENTREGA</Label>
              <TextValue>{order.endDateFormatted || '--/--/--'}</TextValue>
            </Wrapper>
          </WrapperDate>
        </Card>

        <StatusCards>
          <WrapperStatus
            onPress={() => {
              navigation.navigate('RegisterProblem', {
                orderId: order.id,
                navigation,
              });
            }}>
            <Icon name="highlight-off" size={30} color="red" />
            <TextStatus>Informar</TextStatus>
            <TextStatus>Problema</TextStatus>
          </WrapperStatus>

          <WrapperStatus
            onPress={() => {
              navigation.navigate('ListProblem', {
                orderId: order.id,
              });
            }}>
            <Icon name="info" size={30} color="#FFD700" />
            <TextStatus>Visualizar</TextStatus>
            <TextStatus>Problemas</TextStatus>
          </WrapperStatus>

          {!order?.startDateFormatted && (
            <WrapperStatus onPress={handleStartDate}>
              <Icon name="schedule" size={30} color="#006400" />
              <TextStatus>Registrar</TextStatus>
              <TextStatus>Retirada</TextStatus>
            </WrapperStatus>
          )}

          {!order?.endDateFormatted && (
            <WrapperStatus
              onPress={() => {
                navigation.navigate('ConfirmDelivery', { order: order.id });
              }}>
              <Icon name="check-circle" size={30} color="#7d40e7" />
              <TextStatus>Confirmar</TextStatus>
              <TextStatus>Entrega</TextStatus>
            </WrapperStatus>
          )}
        </StatusCards>
      </Container>
    </Background>
  );
};

Details.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

Details.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Details;
