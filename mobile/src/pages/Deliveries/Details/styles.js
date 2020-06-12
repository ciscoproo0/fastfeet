import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin: 90px 20px 10px;
`;

export const Card = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 20px;

  background: #fff;
  border-radius: 6px;

  border-width: 1px;
  border-color: #edebeb;
  border-bottom-width: 1px;
`;
export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const WrapperDate = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

export const OrderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: 'rgba(0,0,0,0.3)';
`;

export const TextValue = styled.Text`
  font-size: 14px;
  color: 'rgba(0,0,0,0.6)';
`;

export const StatusCards = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const WrapperStatus = styled(RectButton)`
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 8px;

  background: #f8f9fd;
  border-radius: 6px;
`;

export const TextStatus = styled.Text.attrs({})`
  font-size: 14px;
  color: 'rgba(0,0,0, 0.6)';
`;
