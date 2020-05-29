import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #7d40e7;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 340px;
  background: #fff;
  border-radius: 4px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin: 30px 30px;
      height: 40px;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;

      label {
        font-weight: bold;
        color: rgba(0, 0, 0, 0.7);
        padding-top: 10px;
        padding-bottom: 5px;
        display: block;
      }

      input {
        display: block;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 10px 15px;
        margin-top: 5px;
        height: 35px;
        width: 260px;
      }

      button {
        height: 40px;
        width: 260px;
        background: #7d40e7;
        color: #fff;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, '#7d40e7')};
        }

        &:disabled {
          background: #999999;
        }
      }
    }
  }
`;
