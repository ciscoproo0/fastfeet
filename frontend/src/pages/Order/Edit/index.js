import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { MdDone, MdChevronLeft } from 'react-icons/md';

import { Container, Content, HeadItems, Form } from './styles';
import Header from '../../../components/Header';
import history from '../../../services/history';
import api from '../../../services/api';

export default function Edit({
  location: {
    state: { order },
  },
}) {
  const [recipient, setRecipient] = useState([]);
  const [deliveryman, setDeliveryman] = useState([]);
  const [product, setProduct] = useState(order?.product ?? '');
  const refRecipient = useRef();
  const refDeliveryman = useRef();

  async function loadOptions() {
    try {
      const recipientResponse = await api.get('/recipients');

      const deliverymanResponse = await api.get('/deliveryman');

      setRecipient(recipientResponse.data);
      setDeliveryman(deliverymanResponse.data);
    } catch (err) {
      toast.error(
        'Erro ao carregar destinatários e/ou entregadores, contate o administrador do sistema'
      );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { id: recipientId, name, zip_code, number } = recipient.find(
      (item) => item.name === refRecipient.current.value
    );

    const { id: deliverymanId, email } = deliveryman.find(
      (item) => item.name === refDeliveryman.current.value
    );
    if (!order) {
      try {
        api.post('/orders', {
          recipient: {
            name,
            zipCode: zip_code,
            number,
          },
          deliveryman: { email },
          order: {
            recipientId,
            deliverymanId,
            product,
          },
        });

        return toast.success('Cadastro registrado com sucesso!');
      } catch (err) {
        return toast.error(
          'Erro ao cadastrar encomenda, contate o administrador do sistema.'
        );
      }
    } else {
      try {
        api.put(`/orders/${order.id}`, {
          deliveryman_id: deliverymanId,
          recipient_id: recipientId,
          product,
        });

        return toast.success('Cadastro editado com sucesso!');
      } catch (err) {
        return toast.error(
          'Erro ao cadastrar encomenda, contate o administrador do sistema.'
        );
      }
    }
  }

  useEffect(() => {
    loadOptions();
  }, []);
  return (
    <Container>
      <Header />
      <Content>
        <HeadItems>
          {order ? (
            <h1>Edição de encomendas</h1>
          ) : (
            <h1>Cadastro de encomenda</h1>
          )}

          <div id="buttons">
            <button
              type="button"
              id="back-button"
              onClick={() => history.push('/encomendas')}
            >
              <MdChevronLeft size={24} />
              VOLTAR
            </button>
            <button type="submit" form="edit-order" id="save-button">
              <MdDone size={24} />
              SALVAR
            </button>
          </div>
        </HeadItems>

        <Form id="edit-order" onSubmit={(event) => handleSubmit(event)}>
          <div id="dropdowns">
            <label htmlFor="recipient">
              <span>Destinatário</span>
              <select id="recipient" ref={refRecipient}>
                {recipient.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </label>

            <label htmlFor="deliveryman">
              <span>Entregador</span>
              <select id="deliveryman" ref={refDeliveryman}>
                {deliveryman.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div id="inputs">
            <label htmlFor="product">
              <span>Nome do Produto</span>
              <input
                type="text"
                id="product-input"
                placeholder="Samsung 58 Polegadas"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
              />
            </label>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

Edit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      order: PropTypes.node,
    }),
  }),
};

Edit.defaultProps = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      order: null,
    }),
  }),
};
