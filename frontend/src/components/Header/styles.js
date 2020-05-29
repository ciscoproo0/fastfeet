import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;
  color: #999999;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  height: 60px;
  padding: 30px;

  img {
    height: 30px;
    padding-right: 40px;
    padding-left: 10px;
    border-right: 2px solid #e2e2e2;
  }
`;

export const Items = styled.ul`
  display: flex;
  font-weight: bold;

  li {
    margin: 5px;
    padding: 5px;
  }

  a {
    color: #999999;
    text-decoration: none;

    &:focus {
      color: #444444;
    }

    &:hover {
      cursor: pointer;
      color: #444444;
    }

    &:active {
      color: #444444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #444444;

  button {
    color: #de3b3b;
    border: none;
    background: #ffffff;
    padding: 2px;
    margin-top: 10px;
  }
`;
