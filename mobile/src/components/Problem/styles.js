import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #fff;

  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 70px;

  border-width: 1px;
  border-color: #edebeb;
  border-bottom-width: 1px;
`;

export const ProblemDetails = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 16px;
  font-weight: bold;
  color: 'rgba(0,0,0,0.4)';
  width: 220px;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: 'rgba(0,0,0,0.3)';
`;
