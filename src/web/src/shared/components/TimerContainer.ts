import styled from 'styled-components'

export const TimerContainer = styled.div`
display: flex;
height: 40vh;
justify-content: center;
align-itens: center;
letter-spacing: 2px;
font-size: 5rem;
position: relative;

`;

export const TimerIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-itens: center;
  padding: 10px 20px;
  height: 5vh;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  font-size: 3rem;

`;

export const GoBackButton = styled.button`
  display: flex;
  justify-content: column;
  align-itens: center;
  padding: 15px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  background-color: #a7f4ed;
  border: none;
  line-height: 0px;
  font-weight: bold;
  color: #0c141c;

  `;