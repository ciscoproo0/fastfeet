import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 40px 20px 40px;
`;

export const CameraContainer = styled.View`
  flex: 1;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;

export const PreviewContainer = styled.Modal`
  flex: 1;
`;

export const PicturePreview = styled.Image`
  flex-direction: row;
  justify-content: center;
  /* width: ${Dimensions.get('window').width * 0.9};
  height: ${Dimensions.get('window').height * 0.8}; */
  border-radius: 6px;
  margin-bottom: 10px;
  width: 350px;
  height: 600px;
`;

export const ShotContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ShotButton = styled(RectButton)`
  background-color: 'rgba(0,0,0,0.4)';
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  margin-top: -100px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 46px;
  background: #7d40e7;
  padding: 0 15px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 46px;
  background: #fff;
  padding: 0 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
