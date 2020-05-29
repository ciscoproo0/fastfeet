import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const Content = styled.div`
  position: fixed;
  width: 40%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 15px;
  border-radius: 4px;
  color: #666666;

  h1 {
    font-size: 18px;
    padding: 10px;
  }

  p {
    padding: 10px;
  }
`;
