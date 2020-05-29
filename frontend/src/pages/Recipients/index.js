import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Container, Content, RecipientTable } from './styles';
import api from '../../services/api';

import Header from '../../components/Header';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import EmptyTable from '../../components/EmptyTable';
import Loading from '../../components/Loading';
import Action from './Action';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function listRecipients(query) {
    const url = `/recipients`;
    let response;

    if (query) {
      try {
        response = await api.get(url, {
          params: {
            q: query,
          },
        });

        if (response.data.length === 0) {
          toast.warn('Nenhum destinatário encontrado com este nome');

          response = await api.get(url);
        }
      } catch (err) {
        toast.error('Não foi possível obter dados, contate o administrador');
      }
    } else {
      try {
        response = await api.get(url, {
          params: {
            page,
          },
        });
      } catch (err) {
        toast.error('Não foi possível obter dados, contate o administrador');
      }
    }

    setRecipients(response.data);
    setLoading(false);
  }

  async function handleSearch(event) {
    setPage(1);
    setLoading(false);
    listRecipients(event);
  }

  async function handleDelete(id) {
    if (id) {
      try {
        await api.delete(`/recipients/${id}`);
        toast.success('Destinatário excluído!');
        listRecipients();
      } catch (err) {
        toast.error(
          'Erro ao excluir Destinatário, contate o administrador do sistema.'
        );
      }
    }
  }

  function previousPage() {
    setPage(page - 1);
    setLoading(false);
  }

  function nextPage() {
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    listRecipients();
  }, [page]);

  return (
    <Container>
      <Header />
      <Content>
        <h1>Gerenciando Destinatários</h1>
        <Search handleSearch={(event) => handleSearch(event)} />

        {recipients.length === 0 && page > 1 ? (
          <EmptyTable />
        ) : loading ? (
          <Loading />
        ) : (
          <RecipientTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td>
                    <span>{`#${recipient.id}`}</span>
                  </td>
                  <td>
                    <span>{recipient.name}</span>
                  </td>
                  <td>
                    <span>{`${recipient.address}, ${recipient.number} - ${recipient.complement} - ${recipient.city},  ${recipient.state}`}</span>
                  </td>
                  <td>
                    <Action
                      recipient={recipient}
                      handleDelete={(event) => handleDelete(event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </RecipientTable>
        )}
        <Pagination
          pageCurrent={page}
          nextPage={() => nextPage()}
          previousPage={() => previousPage()}
          stateLength={recipients.length}
        />
      </Content>
    </Container>
  );
}
