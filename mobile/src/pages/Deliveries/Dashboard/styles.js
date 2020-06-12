import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px 20px;
  background: #fff;
`;

export const Deliveries = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})``;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const SelectOrderStatus = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PendingButton = styled(RectButton)``;

export const PendingText = styled.Text`
  color: ${(props) => (props.selected ? '#7d40e7' : 'rgba(0,0,0,0.4)')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  font-weight: bold;
  font-size: 14px;
  padding: 5px;
`;

export const DeliveredButton = styled(RectButton)``;

export const DeliveredText = styled.Text`
  color: ${(props) => (props.selected ? '#7d40e7' : 'rgba(0,0,0,0.4)')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  font-weight: bold;
  font-size: 14px;
  padding: 5px;
`;
