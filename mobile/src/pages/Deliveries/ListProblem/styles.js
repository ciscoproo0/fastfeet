import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px 10px 10px;
`;

export const Problems = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Title = styled.Text`
  align-self: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #fff;
  font-size: 24px;
`;
