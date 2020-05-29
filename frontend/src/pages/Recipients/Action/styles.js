import styled from 'styled-components';

export const Container = styled.div`
  button {
    height: 40px;
    background: #ffffff;
    border: none;
  }
`;

export const MoreInfo = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  transition: 0.5s linear;
  flex-direction: column;
  text-align: left;
  position: absolute;
  width: 130px;
  height: 70px;
  padding: 5px 5px;
  margin-top: 15px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 30px);
    top: -4px;
    border: 4px solid #ffffff;
    box-shadow: 1px -1px 0px 0px rgba(0, 0, 0, 0.2);
    transform-origin: 22 0;
    transform: rotate(-45deg);
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
    color: #666666;
    height: 30px;
    border: none;
    border-bottom: 1px solid #eeeeee;

    svg {
      margin-right: 10px;
    }
  }
`;
