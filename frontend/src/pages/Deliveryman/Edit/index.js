import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdChevronLeft, MdDone } from 'react-icons/md';

import { Container, Content, HeadItems, Form } from './styles';

import api from '../../../services/api';
import history from '../../../services/history';

import DefaultImg from '../../../assets/images/default.jpeg';
import Header from '../../../components/Header';

export default function Edit(props) {
  const {
    location: {
      state: { deliveryman },
    },
  } = props;

  const [name, setName] = useState(deliveryman?.name ?? null);
  const [email, setEmail] = useState(deliveryman?.email ?? null);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState({
    id: deliveryman?.avatar?.id ?? null,
    url: deliveryman?.avatar?.url ?? '',
  });
  const oldEmail = deliveryman?.email ?? null;
  const ref = useRef();

  function handleFile(event) {
    if (event.target.files[0].size > 2000000) {
      toast.error('Selecione um arquivo menor que 2mb');
      return;
    }
    const data = new FormData();

    // To preview uploaded image
    const fileTemp = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar({ ...avatar.id, url: reader.result });
    };
    reader.readAsDataURL(fileTemp);

    data.append('file', event.target.files[0]);

    setFile(data);
  }
  function handleName(event) {
    setName(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (file) {
      const { data } = await api.post('files', file);

      avatar.id = data.id;
      avatar.url = data.url;
      setAvatar(avatar);
    }

    if (deliveryman) {
      try {
        await api.put('deliveryman', {
          name,
          email,
          avatar_id: avatar.id,
          ...(email !== oldEmail ? { oldEmail } : null),
        });

        toast.success('Entregador atualizado com sucesso!');
      } catch (err) {
        toast.error(
          'Ocorreu um erro e não foi possível atualizar o entregador. Contate o administrador do sistema'
        );
      }
    } else {
      try {
        await api.post('deliveryman', {
          name,
          email,
          ...(avatar.id ? { avatar_id: avatar.id } : null),
        });

        toast.success('Entregador cadastrado com sucesso!');
      } catch (err) {
        toast.error(
          `Não foi possível cadastrar o entregador. Contate o administrador do sistema, erro: ${err}`
        );
      }
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <HeadItems>
          {deliveryman ? (
            <h1>Edição de entregadores</h1>
          ) : (
            <h1>Cadastro de entregador</h1>
          )}

          <div id="buttons">
            <button
              type="button"
              id="back-button"
              onClick={() => history.push('/entregadores')}
            >
              <MdChevronLeft size={24} />
              VOLTAR
            </button>
            <button type="submit" form="edit-deliveryman" id="save-button">
              <MdDone size={24} />
              SALVAR
            </button>
          </div>
        </HeadItems>

        <Form id="edit-deliveryman" onSubmit={(event) => handleSubmit(event)}>
          <div id="image-input">
            <label htmlFor="avatar">
              <img src={avatar.url || DefaultImg} alt="entregador" />
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                data-file={file}
                ref={ref}
                onChange={(event) => handleFile(event)}
              />
            </label>
          </div>

          <div id="inputs">
            <label htmlFor="name">
              <span>Nome</span>
              <input
                type="text"
                id="name"
                placeholder={deliveryman ? deliveryman.name : 'João da Silva'}
                value={name || ''}
                onChange={(event) => handleName(event)}
              />
            </label>

            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                id="email"
                placeholder={
                  deliveryman ? deliveryman.email : 'exemplo@email.com'
                }
                value={email || ''}
                onChange={(event) => handleEmail(event)}
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
      deliveryman: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar_id: PropTypes.number.isRequired,
        avatar: PropTypes.shape({
          id: PropTypes.number,
          url: PropTypes.string,
        }),
      }),
    }),
  }),
};

Edit.defaultProps = {
  location: null,
};
