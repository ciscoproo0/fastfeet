import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';

import { Container, Content, DeliverymanTable } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import EmptyTable from '../../components/EmptyTable';
import Action from './Action';
import Loading from '../../components/Loading';

export default function Deliveryman() {
  const [deliverymanList, setDeliverymanList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function listDeliveryman(query) {
    const url = `/deliveryman`;
    let response;

    if (query) {
      try {
        response = await api.get(url, {
          params: {
            q: query,
          },
        });

        if (response.data.length === 0) {
          toast.warn('Nenhum entregador(a) encontrado(a) com este nome');

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

    setDeliverymanList(response.data);
    setLoading(false);
  }

  async function handleSearch(event) {
    setPage(1);
    setLoading(true);
    listDeliveryman(event);
  }

  async function handleDelete(id) {
    if (id) {
      try {
        await api.delete(`/deliveryman/${id}`);
        toast.success('Entregador(a) excluído(a)!');
        listDeliveryman();
      } catch (err) {
        toast.error(
          'Erro ao excluir Entregador(a), contate o administrador do sistema.'
        );
      }
    }
  }

  function previousPage() {
    setPage(page - 1);
    setLoading(true);
  }

  function nextPage() {
    setPage(page + 1);
    setLoading(true);
  }

  useEffect(() => {
    listDeliveryman();
  }, [page]);
  return (
    <Container>
      <Header />
      <Content>
        <h1>Gerenciando Entregadores</h1>
        <Search handleSearch={(event) => handleSearch(event)} />

        {deliverymanList.length === 0 && page > 1 ? (
          <EmptyTable />
        ) : loading ? (
          <Loading />
        ) : (
          <DeliverymanTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>

                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymanList.map((deliveryman) => (
                <tr key={deliveryman.id}>
                  <td>
                    <span>{`#${deliveryman.id}`}</span>
                  </td>
                  <td>
                    <Avatar
                      color={Avatar.getRandomColor('sitebase', [
                        '#7d40e7',
                        '#ffffff',
                        '#7d40e7',
                      ])}
                      name={deliveryman.name}
                      size={45}
                      textSizeRatio={1}
                      round
                      alt={deliveryman.name}
                      maxInitials={1}
                      className="avatar"
                      src={deliveryman.avatar?.url}
                    />
                  </td>
                  <td>
                    <span>{deliveryman.name}</span>
                  </td>
                  <td>
                    <span>{deliveryman.email}</span>
                  </td>
                  <td>
                    <Action
                      deliveryman={deliveryman}
                      handleDelete={(event) => handleDelete(event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </DeliverymanTable>
        )}
        <Pagination
          pageCurrent={page}
          nextPage={() => nextPage()}
          previousPage={() => previousPage()}
          stateLength={deliverymanList.length}
        />
      </Content>
    </Container>
  );
}
