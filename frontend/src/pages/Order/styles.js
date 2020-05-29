import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  background: #f5f5f5;
`;

export const Content = styled.div`
  max-width: 80%;
  margin: 30px auto;

  h1 {
    color: #444444;
    margin-bottom: 30px;
  }
`;

export const DeliveryTable = styled.table`
  width: 100%;
  border-spacing: 0 15px;
  overflow-x: auto;

  thead th {
    text-align: center;
    padding: 15px 0 15px 0px;

    &:last-child {
      text-align: right;
      padding-right: 10px;
    }
  }

  tbody tr td {
    background: #ffffff;
    color: #666666;
    padding: 15px;

    #deliveryman {
      display: flex;
      justify-content: left;
      align-items: center;

      .avatar {
        margin-right: 20px;
      }
    }

    #order {
      display: flex;
      justify-content: left;
      align-items: center;

      /* Tooltip container */
      #tooltip {
        position: relative;
        display: inline-block;
      }

      /* Tooltip text */
      #tooltip #tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        text-align: center;
        padding: 5px 2px;
        border-radius: 4px;

        /* Position the tooltip text */
        position: absolute;
        z-index: 99;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;
      }

      /* Tooltip arrow */
      #tooltip #tooltiptext::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
      }

      /* Show the tooltip text when you mouse over the tooltip container */
      #tooltip:hover #tooltiptext {
        visibility: visible;
        opacity: 1;
      }
    }

    &:last-child {
      width: 40px;
      text-align: right;
      cursor: pointer;
    }
  }
`;

export const OrderPending = styled.div`
  width: 110px;
  display: flex;
  align-items: center;
  background: #f0f0df;
  color: #c1bc35;
  border-radius: 40px;
  padding: 2px;

  svg {
    margin: 0 5px 0 5px;
  }
`;

export const OrderOnRoute = styled.div`
  width: 110px;
  display: flex;
  align-items: center;
  background: #bad2ff;
  color: #4d85ee;
  border-radius: 40px;
  padding: 2px;

  svg {
    margin: 0 5px 0 5px;
  }
`;

export const OrderDelivered = styled.div`
  width: 110px;
  display: flex;
  align-items: center;
  background: #dff0df;
  color: #2ca42b;
  border-radius: 40px;
  padding: 2px;

  svg {
    margin: 0 5px 0 5px;
  }
`;

export const OrderCanceled = styled.div`
  width: 110px;
  display: flex;
  align-items: center;
  background: #fab0b0;
  color: #de3b3b;
  border-radius: 40px;
  padding: 2px;

  svg {
    margin: 0 5px 0 5px;
  }
`;
