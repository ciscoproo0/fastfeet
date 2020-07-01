import React, { useRef, useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import FormData from 'form-data';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import {
  Container,
  CameraContainer,
  Camera,
  PreviewContainer,
  PicturePreview,
  ShotContainer,
  ShotButton,
  SubmitButton,
  BackButton,
  SubmitText,
} from './styles';

import Background from '../../../components/Background';

const ConfirmDelivery = ({ navigation }) => {
  const camera = useRef(null);
  const [picture, setPicture] = useState();
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const order = navigation.getParam('order');

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 1, base64: true };
      const data = await camera.current.takePictureAsync(options);

      setPicture(data);
      setVisibility(!visibility);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(!loading);
      const file = new FormData();

      file.append('file', {
        type: 'image/jpg',
        uri: picture.uri,
        name: 'ProductDelivered.jpg',
      });

      const responsePicture = await api.post('files', file);

      await api.put(`orders/${order}/end_date`, {
        signature_id: responsePicture.data.id,
      });

      setLoading(!loading);

      Alert.alert(
        'Sucesso',
        'Entrega encerrada',
        [
          {
            text: 'Ok',
            onPress: () =>
              navigation.navigate('Dashboard', { refresh: 'refresh' }),
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert(
        'Erro no envio',
        `Ocorreu um erro ao enviar foto, contate o administrador do sistema${err}`
      );
    }
  };

  return (
    <>
      <PreviewContainer
        animationType="fade"
        transparent={false}
        visible={visibility}
        onRequestClose={() => setVisibility(!visibility)}>
        <Background>
          <Container>
            <BackButton onPress={() => setVisibility(false)}>
              <SubmitText style={{ color: 'rgba(0,0,0,0.6)' }}>
                Tirar outra foto
              </SubmitText>
            </BackButton>
            <PicturePreview
              source={{
                uri: picture?.uri,
              }}
            />
            <SubmitButton onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator size={30} color="#FFF" />
              ) : (
                <SubmitText>Enviar</SubmitText>
              )}
            </SubmitButton>
          </Container>
        </Background>
      </PreviewContainer>
      <CameraContainer>
        <Camera
          ref={camera}
          type={Camera.Constants.Type.back}
          autoFocus={Camera.Constants.AutoFocus.on}
          flashMode={Camera.Constants.FlashMode.off}
        />

        <ShotContainer>
          <ShotButton onPress={takePicture}>
            <Icon name="photo-camera" size={40} color="#fff" />
          </ShotButton>
        </ShotContainer>
      </CameraContainer>
    </>
  );
};

ConfirmDelivery.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

ConfirmDelivery.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar Entrega',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

export default ConfirmDelivery;
