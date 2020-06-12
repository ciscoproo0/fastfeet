import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;

  margin: 60px 20px 60px;
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ProblemDescription = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: 'rgba(0,0,0, 0.4)',
  textAlignVertical: 'top',
  numberOfLines: 20,
})`
  background: #fff;

  font-size: 16px;
  padding: 15px 10px;
  margin-bottom: 20px;
  border-radius: 4px;

  border-width: 1px;
  border-color: #edebeb;
  border-bottom-width: 1px;
`;

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: #7d40e7;
  padding: 0 15px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
