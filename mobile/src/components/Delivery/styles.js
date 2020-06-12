import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  background: #f8f9fd;
  border-radius: 8px;
  margin-bottom: 20px;

  border-width: 1px;
  border-color: #edebeb;
  border-bottom-width: 1px;
`;

export const Head = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: #fff;
`;

export const DeliveryID = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const Body = styled.View`
  background: #fff;
  height: 80px;
  padding: 20px;
`;

export const TimeLine = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LineWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Dot = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  background: #7d40e7;
  height: 1px;
  width: 120px;
`;

export const DotText = styled.Text`
  font-size: 10px;
  color: 'rgba(0,0,0,0.4)';
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background: #f8f9fd;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 10px;
  color: 'rgba(0,0,0,0.4)';
`;

export const Value = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 12px;
`;

export const DetailsButton = styled(RectButton)`
  padding: 5px;
`;

export const DetailsText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #7d40e7;
`;
