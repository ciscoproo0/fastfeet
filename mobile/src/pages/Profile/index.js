import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';

import api from '../../services/api';

import { logout } from '../../store/modules/auth/actions';

import {
  Container,
  Avatar,
  Content,
  Label,
  Name,
  NameValue,
  Email,
  EmailValue,
  Date,
  DateValue,
  LogoutButton,
  TextButton,
} from './styles';

const Profile = () => {
  const [deliveryman, setDeliveryman] = useState({});
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const getDeliveryman = async () => {
      const { data } = await api.get('deliveryman', {
        params: {
          id: user.id,
        },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const newDeliveryman = {
        name: data.name,
        url: data.avatar?.url || null,
        email: data.email,
        since: format(utcToZonedTime(data.createdAt, timezone), 'dd/MM/yyyy', {
          locale: pt,
        }),
      };

      setDeliveryman(newDeliveryman);
    };

    getDeliveryman();
  }, []);

  return (
    <Container>
      <Avatar
        source={{
          uri:
            deliveryman.url ||
            'https://api.adorable.io/avatar/100/francisco.svg',
        }}
      />

      <Content>
        <Name>
          <Label>Nome completo</Label>
          <NameValue>{deliveryman.name}</NameValue>
        </Name>

        <Email>
          <Label>Email</Label>
          <EmailValue>{deliveryman.email}</EmailValue>
        </Email>

        <Date>
          <Label>Data de cadastro</Label>

          <DateValue>{deliveryman.since}</DateValue>
        </Date>

        <LogoutButton onPress={handleLogout}>
          <TextButton>Logout</TextButton>
        </LogoutButton>
      </Content>
    </Container>
  );
};

const tabBarIcon = ({ tintColor }) => (
  <Icon name="account-circle" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon,
};

export default Profile;
