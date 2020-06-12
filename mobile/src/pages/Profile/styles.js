import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Avatar = styled.Image`
  margin: 70px auto 20px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: 'rgba(0,0,0,0.4)';
`;

export const Name = styled.View`
  padding-bottom: 10px;
`;

export const NameValue = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 24px;
`;

export const Email = styled.View`
  padding-bottom: 10px;
`;

export const EmailValue = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 24px;
`;

export const Date = styled.View``;

export const DateValue = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 24px;
`;

export const LogoutButton = styled(RectButton)`
  margin-top: 40px;
  background: red;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const TextButton = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 18px;
`;
