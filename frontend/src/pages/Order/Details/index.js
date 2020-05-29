import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ModalContainer,
  Content,
  DeliveryContent,
  DeliveryDate,
  DeliverySignature,
} from './styles';

export default function Details({ handleModal }) {
  const order = useSelector((state) => state.modal.detailsOrder);

  return (
    <ModalContainer onClick={() => handleModal(false)}>
      <Content>
        <DeliveryContent>
          <strong>Informações da encomenda</strong>
          <span>{`${order.recipient.address}, ${order.recipient.number}`}</span>
          <span>{`${order.recipient.city}, ${order.recipient.state}`}</span>
          <span>{order.recipient.zip_code}</span>
        </DeliveryContent>
        <DeliveryDate>
          <strong>Datas</strong>
          <p>
            Retirada:{' '}
            {order.startDateFormatted ? (
              <span>{order.startDateFormatted}</span>
            ) : (
              <span>Não retirado</span>
            )}
          </p>
          <p>
            Entrega:{' '}
            {order.endDateFormatted ? (
              <span>{order.endDateFormatted}</span>
            ) : (
              <span>Não entregue</span>
            )}
          </p>
        </DeliveryDate>
        <DeliverySignature>
          <strong>Assinatura do destinatário</strong>
          {order.signature ? (
            <img src={order.signature.url} alt={order.signature.name} />
          ) : (
            <span>Assinatura ainda não coletada</span>
          )}
        </DeliverySignature>
      </Content>
    </ModalContainer>
  );
}

Details.propTypes = {
  handleModal: PropTypes.func.isRequired,
};
