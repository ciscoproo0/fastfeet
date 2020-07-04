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
`;

export const DeliveryContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 5px 10px 5px;
  border-bottom: 1px solid #eee;

  strong {
    color: #444444;
    padding-bottom: 8px;
  }
`;
export const DeliveryDate = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 5px 10px 5px;
  border-bottom: 1px solid #eee;

  strong {
    color: #444444;
    padding-bottom: 8px;
  }

  p {
    color: #444444;
    font-weight: bold;
  }

  span {
    font-weight: normal;
    color: #666666;
  }
`;
export const DeliverySignature = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 5px 10px 5px;

  strong {
    color: #444444;
    padding-bottom: 4px;
  }

  img {
    width: 500px;
    margin: 5px auto;
  }
`;
