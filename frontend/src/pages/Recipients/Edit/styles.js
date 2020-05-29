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

export const Form = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 4px;

  #form-name {
    span {
      display: block;
      font-size: 12px;
      font-weight: bold;
      color: #444444;
    }

    input {
      width: 770px;
      height: 40px;
      border: 1px solid #e2e2e2;
      padding: 0 10px 0;
      color: #666666;
      border-radius: 4px;
      padding: 0 20px 0;
      margin: 10px 0 10px 0;
    }
  }

  #form-address1 {
    display: flex;
    justify-content: space-between;

    span {
      display: block;
      font-size: 12px;
      font-weight: bold;
      color: #444444;
    }

    input {
      height: 40px;
      border: 1px solid #e2e2e2;
      padding: 0 10px 0;
      color: #666666;
      border-radius: 4px;
      padding: 0 10px 0;
      margin: 10px 0 10px 0;
    }

    #address {
      width: 450px;
    }

    #number {
      width: 80px;
    }

    #complement {
      width: 220px;
    }
  }

  #form-address2 {
    display: flex;
    justify-content: space-between;

    span {
      display: block;
      font-size: 12px;
      font-weight: bold;
      color: #444444;
    }

    input {
      height: 40px;
      border: 1px solid #e2e2e2;
      padding: 0 10px 0;
      color: #666666;
      border-radius: 4px;
      padding: 0 10px 0;
      margin: 10px 0 10px 0;
    }

    #city {
      width: 380px;
    }

    #state {
      width: 190px;
    }

    #cep {
      width: 190px;
    }
  }
`;
