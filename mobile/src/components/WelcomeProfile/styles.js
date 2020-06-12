import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Welcome = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ProfileDetails = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const TextWelcome = styled.Text`
  font-size: 14px;
  color: 'rgba(0,0,0,0.4)';
`;

export const TextName = styled.Text`
  color: #444444;
  font-size: 20px;
  font-weight: bold;
`;

export const ExitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
`;
