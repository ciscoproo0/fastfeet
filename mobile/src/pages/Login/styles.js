import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #7d40e7;

  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
  padding: 0 30px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0,0,0, 0.4)',
})`
  font-size: 15px;
  padding: 0 15px;
  margin-bottom: 10px;
  background: #fff;
  height: 46px;
  border-radius: 4px;
`;

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: #82bf18;
  padding: 0 15px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
