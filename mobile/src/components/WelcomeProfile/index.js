import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { logout } from '../../store/modules/auth/actions';

import {
  Container,
  Welcome,
  Avatar,
  ProfileDetails,
  TextWelcome,
  TextName,
  ExitButton,
} from './styles';

const WelcomeProfile = ({ Deliveryman }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Container>
      <Welcome>
        <Avatar
          source={{
            uri:
              Deliveryman.avatar?.url ||
              'https://api.adorable.io/avatar/50/francisco.png',
          }}
        />
        <ProfileDetails>
          <TextWelcome>Bem vindo de volta,</TextWelcome>
          <TextName>{Deliveryman.name}</TextName>
        </ProfileDetails>
      </Welcome>
      <ExitButton onPress={handleLogout}>
        <Icon name="exit-to-app" size={30} color="red" />
      </ExitButton>
    </Container>
  );
};

WelcomeProfile.propTypes = {
  Deliveryman: PropTypes.instanceOf(Object).isRequired,
};

export default WelcomeProfile;
