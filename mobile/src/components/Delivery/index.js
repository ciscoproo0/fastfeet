import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Head,
  DeliveryID,
  Body,
  TimeLine,
  LineWrapper,
  Line,
  Dot,
  DotText,
  Footer,
  Wrapper,
  Title,
  Value,
  DetailsButton,
  DetailsText,
} from './styles';

const Delivery = ({ navigation, order }) => {
  return (
    <Container>
      <Head>
        <Icon name="local-shipping" size={30} color="#7d40e7" />
        <DeliveryID>Encomenda {order.id}</DeliveryID>
      </Head>

      <Body>
        <TimeLine>
          <LineWrapper>
            <Dot>
              {order?.createdDateFormatted ? (
                <Icon name="fiber-manual-record" size={15} color="#7d40e7" />
              ) : (
                <Icon name="panorama-fish-eye" size={15} color="#7d40e7" />
              )}
              <Line />
            </Dot>
            <DotText>Aguardando</DotText>
          </LineWrapper>

          <LineWrapper>
            <Dot>
              {order?.startDateFormatted ? (
                <Icon name="fiber-manual-record" size={15} color="#7d40e7" />
              ) : (
                <Icon name="panorama-fish-eye" size={15} color="#7d40e7" />
              )}
              <Line />
            </Dot>
            <DotText>Retirada</DotText>
          </LineWrapper>

          <LineWrapper>
            <Dot>
              {order?.endDateFormatted ? (
                <Icon name="fiber-manual-record" size={15} color="#7d40e7" />
              ) : (
                <Icon name="panorama-fish-eye" size={15} color="#7d40e7" />
              )}
            </Dot>
            <DotText>Entregue</DotText>
          </LineWrapper>
        </TimeLine>
      </Body>

      <Footer>
        <Wrapper>
          <Title>Data</Title>
          <Value>{order.createdDateFormatted}</Value>
        </Wrapper>

        <Wrapper>
          <Title>Cidade</Title>
          <Value>{order.recipient.city}</Value>
        </Wrapper>

        <DetailsButton
          onPress={() => navigation.navigate('Details', { order })}>
          <DetailsText>Ver Detalhes</DetailsText>
        </DetailsButton>
      </Footer>
    </Container>
  );
};

Delivery.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  order: PropTypes.instanceOf(Object).isRequired,
};

export default Delivery;
