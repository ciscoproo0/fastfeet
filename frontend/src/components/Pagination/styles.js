import styled from 'styled-components';
import { darken } from 'polished';

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #7d40e7;
    color: #ffffff;
    width: 40px;
    height: 30px;
    border: none;
    border-radius: 4px;
    font-weight: bold;

    &:hover {
      background: ${darken(0.05, '#7d40e7')};
    }

    &:disabled {
      background: #999999;
    }
  }
`;
