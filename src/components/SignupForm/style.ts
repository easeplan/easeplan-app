import styled from 'styled-components';

export const InputWrapper = styled(`div`)`
  .bars {
    margin: 5px 0;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 6px;
    border-radius: 3px;
    background: #dfe1f0;
    width: 100%;

    div {
      height: 4px;
      border-radius: 3px;
      transition: 0.4s;
      width: 0;
    }

    &.weak div {
      background: #e24c71;
      width: 33.33%;
    }

    &.medium div {
      background: #f39845;
      width: 66.66%;
    }
    &.strong div {
      background: #57c558;
      width: 100%;
    }
  }

  .strength {
    text-align: left;
    height: 30px;
    text-transform: capitalize;
    color: #174e64;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Input = styled(`input`)`
  border: 1px solid #dfe1f0;
  outline: none;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #fff;
  color: #1e1e64;
  border-radius: 0px;
  margin: 4px 0;
  text-align: left;
  font-size: 1rem;
  border: solid 1px #ccc;
  background: transparent;
`;
