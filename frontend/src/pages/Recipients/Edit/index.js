import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';

import { MdChevronLeft, MdDone } from 'react-icons/md';

import { Container, Content, HeadItems, Form } from './styles';

import history from '../../../services/history';
import api from '../../../services/api';

import Header from '../../../components/Header';

export default function Edit(props) {
  const {
    location: {
      state: { recipient },
    },
  } = props;

  const id = recipient?.id ?? '';
  const [name, setName] = useState(recipient?.name ?? '');
  const [address, setAddress] = useState(recipient?.address ?? '');
  const [number, setNumber] = useState(recipient?.number ?? '');
  const [complement, setComplement] = useState(recipient?.complement ?? '');
  const [city, setCity] = useState(recipient?.city ?? '');
  const [state, setState] = useState(recipient?.state ?? '');
  const [zipCode, setZipCode] = useState(recipient?.zip_code ?? '');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!recipient) {
      try {
        await api.post('/recipients', {
          name,
          address,
          number,
          complement,
          city,
          state,
          zipCode,
        });
        toast.success('Destinatário cadastrado com sucesso!');
      } catch (err) {
        toast.error(
          'Houve um erro ao registrar este destinatário, contate o administrador do sistema'
        );
      }
    } else {
      try {
        await api.put(`/recipients/${id}`, {
          name,
          address,
          number,
          complement,
          city,
          state,
          zipCode,
        });
        toast.success('Destinatário atualizado com sucesso!');
      } catch (err) {
        toast.error(
          'Houve um erro ao atualizar este destinatário, contate o administrador do sistema'
        );
      }
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <HeadItems>
          {recipient ? (
            <h1>Edição de destinatários</h1>
          ) : (
            <h1>Cadastro de destinatário</h1>
          )}

          <div id="buttons">
            <button
              type="button"
              id="back-button"
              onClick={() => history.push('/destinatarios')}
            >
              <MdChevronLeft size={24} />
              VOLTAR
            </button>
            <button
              type="submit"
              form="edit-deliveryman"
              id="save-button"
              onClick={(event) => handleSubmit(event)}
            >
              <MdDone size={24} />
              SALVAR
            </button>
          </div>
        </HeadItems>

        <Form>
          <div id="form-name">
            <label htmlFor="name">
              <span>Nome</span>
              <input
                type="text"
                id="name"
                placeholder="João da Silva"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div id="form-address1">
            <label htmlFor="address">
              <span>Rua</span>
              <input
                type="text"
                id="address"
                placeholder="Rua do Exemplo"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>
            <label htmlFor="number">
              <span>Número</span>
              <input
                type="number"
                id="number"
                placeholder="45"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </label>
            <label htmlFor="complement">
              <span>Complemento</span>
              <input
                type="text"
                id="complement"
                placeholder="Apto 15"
                value={complement}
                onChange={(event) => setComplement(event.target.value)}
              />
            </label>
          </div>
          <div id="form-address2">
            <label htmlFor="city">
              <span>Cidade</span>
              <input
                type="text"
                id="city"
                placeholder="São Paulo"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </label>
            <label htmlFor="state">
              <span>Estado</span>
              <MaskedInput
                type="text"
                id="state"
                placeholder="SP"
                value={state}
                mask={[/[A-Z]/, /[A-Z]/]}
                onChange={(event) => setState(event.target.value)}
              />
            </label>
            <label htmlFor="cep">
              <span>CEP</span>
              <MaskedInput
                type="text"
                id="cep"
                placeholder="01310-100"
                value={zipCode}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                onChange={(event) => setZipCode(event.target.value)}
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
      recipient: PropTypes.node,
    }),
  }),
};

Edit.defaultProps = {
  location: null,
};
