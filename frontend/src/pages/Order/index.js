import React, { useState, useEffect } from 'react';
import { MdFiberManualRecord, MdPriorityHigh } from 'react-icons/md';
import Avatar from 'react-avatar';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';

import {
  Container,
  Content,
  DeliveryTable,
  OrderPending,
  OrderOnRoute,
  OrderDelivered,
  OrderCanceled,
} from './styles';

import api from '../../services/api';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import Modal from './Details';
import Action from './Action';
import EmptyTable from '../../components/EmptyTable';
import Loading from '../../components/Loading';

export default function Delivery() {
  const [showModal, setShowModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function listOrders(query) {
    const url = `/orders`;
    let response;

    // first find if listOrders has a query parameter (to find an specific order)
    if (query) {
      try {
        response = await api.get(url, {
          params: {
            q: query,
            page,
          },
        });

        if (response.data.length === 0) {
          toast.warn('Nenhuma encomenda encontrada com este nome');

          response = await api.get(url);
        }
      } catch (err) {
        toast.error('Não foi possível obter dados, contate o administrador');
      }
    } else {
      // if not, search for all orders, filtering by page
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

    const problems = await api.get('delivery-problems');

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // after validation, creates a new obj using a user friendly date
    const order = response.data.map((res) => ({
      ...res,
      problemRegistered: problems.data.filter(
        (problem) => problem.delivery_id === res.id
      ),
      startDateFormatted:
        res?.start_date &&
        format(
          utcToZonedTime(new Date(res.start_date), timezone),
          "dd'/'MM'/'yyyy '-' HH':'mm",
          {
            locale: pt,
          }
        ),
      endDateFormatted:
        res?.end_date &&
        format(
          utcToZonedTime(new Date(res.end_date), timezone),
          "dd'/'MM'/'yyyy '-' HH':'mm",
          { locale: pt }
        ),
      canceledDateFormatted:
        res?.canceled_at &&
        format(
          utcToZonedTime(new Date(res.canceled_at), timezone),
          "dd'/'MM'/'yyyy '-' HH':'mm",
          { locale: pt }
        ),
      createdDateFormatted:
        res?.created_at &&
        format(
          utcToZonedTime(new Date(res.created_at), timezone),
          "dd'/'MM'/'yyyy '-' HH':'mm",
          { locale: pt }
        ),
    }));
    setOrderList(order);
    setLoading(false);
  }

  async function handleSearch(searchValue) {
    setPage(1);
    setLoading(true);
    listOrders(searchValue);
  }

  async function handleDelete(id) {
    if (id) {
      try {
        await api.delete(`/orders/${id}`);
        toast.success('Encomenda cancelada!');
        listOrders();
      } catch (err) {
        toast.error(
          'Erro ao cancelar encomenda, contate o administrador do sistema.'
        );
      }
    }
  }

  function handleModal(value) {
    setShowModal(value);
  }

  function Status(value) {
    if (value.start_date && value.end_date && !value.canceled_at) {
      return (
        <OrderDelivered>
          <MdFiberManualRecord size={14} />
          <strong>Entregue</strong>
        </OrderDelivered>
      );
    }
    if (value.start_date && !value.end_date && !value.canceled_at) {
      return (
        <OrderOnRoute>
          <MdFiberManualRecord size={14} />
          <strong>Retirada</strong>
        </OrderOnRoute>
      );
    }
    if (!value.start_date && !value.canceled_at) {
      return (
        <OrderPending>
          <MdFiberManualRecord size={14} />
          <strong>Pendente</strong>
        </OrderPending>
      );
    }
    if (value.canceled_at) {
      return (
        <OrderCanceled>
          <MdFiberManualRecord size={14} />
          <strong>Cancelado</strong>
        </OrderCanceled>
      );
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

  // when a page changes, it calls listOrders again
  useEffect(() => {
    setLoading(true);
    listOrders();
  }, [page]);

  return (
    <Container>
      {showModal ? <Modal handleModal={(event) => handleModal(event)} /> : null}

      <Header />
      <Content>
        <h1>Gerenciando Encomendas</h1>
        <Search handleSearch={(event) => handleSearch(event)} />

        {orderList.length === 0 && page > 1 ? (
          <EmptyTable />
        ) : loading ? (
          <Loading />
        ) : (
          <DeliveryTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Produto</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span>{`#${order.id}`}</span>
                  </td>
                  <td>
                    <span>{order.recipient.name}</span>
                  </td>
                  <td>
                    <div id="deliveryman">
                      <Avatar
                        color={Avatar.getRandomColor('sitebase', [
                          '#7d40e7',
                          '#ffffff',
                          '#7d40e7',
                        ])}
                        name={order.deliveryman.name}
                        size={45}
                        textSizeRatio={1}
                        round
                        alt={order.deliveryman.name}
                        maxInitials={1}
                        className="avatar"
                        src={order.deliveryman.avatar?.url}
                      />
                      <span>{order.deliveryman.name}</span>
                    </div>
                  </td>
                  <td>
                    <div id="order">
                      <span>{order.product}</span>
                      <span>
                        <div id="tooltip">
                          {order?.problemRegistered.length !== 0 && (
                            <MdPriorityHigh size={30} color="red" />
                          )}
                          <span id="tooltiptext">
                            Existe pelo menos um problema associado à esta
                            encomenda!
                          </span>
                        </div>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>{order.recipient.city}</span>
                  </td>
                  <td>
                    <span>{order.recipient.state}</span>
                  </td>
                  <td>{Status(order)}</td>
                  <td>
                    <Action
                      showModal={showModal}
                      order={order}
                      handleModal={(event) => handleModal(event)}
                      handleDelete={(event) => handleDelete(event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </DeliveryTable>
        )}
        <Pagination
          pageCurrent={page}
          nextPage={() => nextPage()}
          previousPage={() => previousPage()}
          stateLength={orderList.length}
        />
      </Content>
    </Container>
  );
}
