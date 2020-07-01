import React, { useState, useEffect, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';

import api from '../../../services/api';

import {
  Container,
  Deliveries,
  Header,
  Title,
  SelectOrderStatus,
  PendingButton,
  PendingText,
  DeliveredButton,
  DeliveredText,
} from './styles';

import WelcomeProfile from '../../../components/WelcomeProfile';
import Delivery from '../../../components/Delivery';

const Dashboard = ({ navigation }) => {
  const INITIAL_ORDERS_VALUE = [];
  const INITIAL_PAGE_VALUE = 1;

  const [selectPending, setSelectPending] = useState(true);
  const [selectDelivered, setSelectDelivered] = useState(false);
  const [deliveryman, setDeliveryman] = useState({});
  const [orders, setOrders] = useState(INITIAL_ORDERS_VALUE);
  const [page, setPage] = useState(INITIAL_PAGE_VALUE);

  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState('pending');
  const [refresh, setRefresh] = useState(false);
  const user = useSelector((state) => state.user.profile);

  const getOrders = async () => {
    try {
      const deliverymanResponse = await api.get(`deliveryman`, {
        params: {
          id: user.id,
        },
      });

      const ordersResponse = await api.get(
        `${
          searchState === 'pending'
            ? `orders/deliveryman/${deliverymanResponse.data.id}`
            : `orders/deliveryman/${deliverymanResponse.data.id}/deliveries`
        }`,
        {
          params: {
            page,
          },
        }
      );

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const ordersParsed = ordersResponse.data.map((res) => ({
        ...res,
        createdDateFormatted:
          res?.created_at &&
          format(
            utcToZonedTime(new Date(res.created_at), timezone),
            'dd/MM/yyyy',
            { locale: pt }
          ),
        startDateFormatted: res?.start_date
          ? format(
              utcToZonedTime(new Date(res.start_date), timezone),
              'dd/MM/yyyy',
              { locale: pt }
            )
          : null,
        endDateFormatted: res?.end_date
          ? format(
              utcToZonedTime(new Date(res.end_date), timezone),
              "dd'/'MM'/'yyyy",
              { locale: pt }
            )
          : null,
        canceledDateFormatted: res?.canceled_at
          ? format(
              utcToZonedTime(new Date(res.canceled_at), timezone),
              "dd'/'MM'/'yyyy '-' HH':'mm",
              { locale: pt }
            )
          : null,
      }));

      setLoading(false);
      setDeliveryman(deliverymanResponse.data);
      setRefresh(false);

      if (orders) {
        setOrders([...orders, ...ordersParsed]);
      } else {
        setOrders(ordersParsed);
      }
    } catch (err) {
      setRefresh(false);

      Alert.alert(
        'Erro na listagem',
        'Não foi possível obter dados, contate o administrador do sistema'
      );
    }
  };

  const handlePending = useCallback(() => {
    // Toggle between buttons
    setSelectPending(true);
    setSelectDelivered(false);

    if (searchState === 'pending') {
      setRefresh(true);
    }
    setSearchState('pending');
    setPage(INITIAL_PAGE_VALUE);
    setOrders(INITIAL_ORDERS_VALUE);
  }, [INITIAL_ORDERS_VALUE, INITIAL_PAGE_VALUE]);

  const handleDelivered = useCallback(() => {
    // Toggle between buttons
    setSelectDelivered(true);
    setSelectPending(false);

    if (searchState === 'delivered') {
      setRefresh(true);
    }

    setSearchState('delivered');
    setRefresh(!refresh);
    setPage(INITIAL_PAGE_VALUE);
    setOrders(INITIAL_ORDERS_VALUE);
  }, [INITIAL_ORDERS_VALUE, INITIAL_PAGE_VALUE]);

  const refreshOrders = useCallback(() => {
    setRefresh(!refresh);
    setPage(INITIAL_PAGE_VALUE);
    setOrders(INITIAL_ORDERS_VALUE);
  }, [INITIAL_ORDERS_VALUE, INITIAL_PAGE_VALUE]);

  useEffect(() => {
    getOrders();
  }, [searchState, page, refresh]);

  return (
    <Container>
      {/* if user came from another screen, state orders will be updated */}
      {navigation.getParam('refresh') ? (
        <NavigationEvents onWillFocus={refreshOrders} />
      ) : null}

      <WelcomeProfile Deliveryman={deliveryman} />
      <Header>
        <Title>Entregas</Title>

        <SelectOrderStatus>
          <PendingButton onPress={handlePending}>
            <PendingText selected={selectPending}>Pendentes</PendingText>
          </PendingButton>
          <DeliveredButton onPress={handleDelivered}>
            <DeliveredText selected={selectDelivered}>Entregues</DeliveredText>
          </DeliveredButton>
        </SelectOrderStatus>
      </Header>
      {loading ? (
        <ActivityIndicator size={100} color="#7d40e7" />
      ) : (
        <Deliveries
          data={orders}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.4}
          onEndReached={() => setPage(page + 1)}
          onRefresh={refreshOrders}
          refreshing={loading}
          renderItem={({ item }) => (
            <Delivery order={item} navigation={navigation} />
          )}
        />
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Dashboard;
