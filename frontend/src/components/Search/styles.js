import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    position: relative;

    input {
      color: #666666;
      height: 30px;
      padding-left: 40px;
      border: 1px solid #ddd;
      border-radius: 4px;

      &::placeholder {
        color: #9f9f9f;
      }
    }
    > svg {
      position: absolute;
      padding: 1px;
      margin-top: 2px;
      margin-left: 10px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #7d40e7;
      color: #ffffff;
      width: 120px;
      height: 30px;
      border: none;
      border-radius: 4px;
      font-weight: bold;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;
