import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
  min-height: 100%;
`;

export const Content = styled.div`
  max-width: 80%;
  margin: 30px auto;

  h1 {
    color: #444444;
    margin-bottom: 30px;
  }
`;

export const DeliverymanTable = styled.table`
  width: 100%;
  border-spacing: 0 15px;

  thead th {
    text-align: left;
    padding: 20px 0 10px 20px;

    &:last-child {
      text-align: right;
      padding-right: 10px;
    }
  }

  tbody tr td {
    background: #ffffff;
    color: #666666;
    padding: 10px;

    > span {
      padding-left: 10px;
    }

    &:last-child {
      width: 40px;
      text-align: right;
      cursor: pointer;
    }
  }
`;
