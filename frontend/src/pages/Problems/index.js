import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Container, Content, ProblemTable } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import EmptyTable from '../../components/EmptyTable';
import Loading from '../../components/Loading';
import Modal from './Details';
import Action from './Action';

export default function Problems() {
  const [showModal, setShowModal] = useState(false);
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function listProblems() {
    try {
      const url = '/delivery-problems';
      const { data } = await api.get(url, {
        params: {
          page,
        },
      });

      setProblems(data);
      setLoading(false);
    } catch (err) {
      toast.error(
        'Ocorreu um erro ao carregar problemas, contate o administrador do sistema.'
      );
    }
  }

  function handleModal() {
    setShowModal(!showModal);
  }

  function previousPage() {
    setPage(page - 1);
    setLoading(false);
  }

  function nextPage() {
    setPage(page + 1);
    setLoading(false);
  }
  async function handleCancelOrder(id) {
    if (id) {
      try {
        await api.delete(`/orders/${id}`);
        toast.success('Encomenda cancelada!');
        listProblems();
      } catch (err) {
        toast.error(
          'Erro ao cancelar encomenda, contate o administrador do sistema.'
        );
      }
    }
  }

  useEffect(() => {
    listProblems();
  }, [page]);
  return (
    <Container>
      {showModal ? <Modal handleModal={(event) => handleModal(event)} /> : null}
      <Header />
      <Content>
        <h1>Gerenciando Problemas</h1>

        {problems.length === 0 && page > 1 ? (
          <EmptyTable />
        ) : loading ? (
          <Loading />
        ) : (
          <ProblemTable>
            <thead>
              <tr>
                <th>Encomenda</th>
                <th>Problema</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem.id}>
                  <td>
                    <span>{`#${problem.delivery_id}`}</span>
                  </td>
                  <td>
                    <span className="problem-description">
                      {problem.description}
                    </span>
                  </td>
                  <td>
                    <Action
                      handleModal={(event) => handleModal(event)}
                      handleCancelOrder={(event) => handleCancelOrder(event)}
                      problem={problem}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </ProblemTable>
        )}
        <Pagination
          pageCurrent={page}
          nextPage={() => nextPage()}
          previousPage={() => previousPage()}
          stateLength={problems.length}
        />
      </Content>
    </Container>
  );
}
