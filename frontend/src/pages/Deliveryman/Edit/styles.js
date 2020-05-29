import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #f5f5f5;
  height: 100%;
`;
export const Content = styled.div`
  max-width: 800px;
  margin: 30px auto;
  margin-bottom: 30px;
`;

export const HeadItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  h1 {
    color: #444444;
  }

  #buttons {
    display: flex;

    #back-button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 100px;
      background: #cccccc;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      margin-right: 10px;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#cccccc')};
      }

      svg {
        margin-right: 3px;
      }
    }

    #save-button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 100px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }

      svg {
        margin-right: 3px;
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  padding: 20px;

  #image-input {
    label {
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }

    img {
      align-items: center;
      display: block;
      height: 200px;
      width: 200px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
    input {
      display: none;
    }
  }

  #inputs {
    display: flex;
    flex-direction: column;
    width: 100%;

    span {
      font-size: 12px;
      font-weight: bold;
      color: #444444;
    }

    input {
      display: block;
      width: 100%;
      height: 40px;
      border: 1px solid #e2e2e2;
      color: #666666;
      border-radius: 4px;
      padding: 0 20px 0;
      margin: 10px 0 10px 0;
    }
  }
`;
