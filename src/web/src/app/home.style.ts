import Link from "next/link";
import { darken } from "polished";
import styled from "styled-components";

export const RoundLink = styled(Link)`
  background: ${({ theme }) => theme.button.background.primary};
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;

  font-size: 4rem;
  padding: 0.25rem;
  text-decoration: none;
  transition: background 0.2s ease-in-out;
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  min-width: 4rem;
  min-height: 4rem;
  height: 10vw;

  max-width: 100px;
  max-height: 100px;

  &:hover, &:focus {
    background: ${({ theme }) => darken(0.2, theme.button.background.primary)};
  }
`

export const RoundButton = styled.button`
  background: ${({ theme }) => theme.button.background.primary};
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;

  font-size: 4rem;
  padding: 0.25rem;
  text-decoration: none;
  transition: background 0.2s ease-in-out;
  
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  width: 10vw;
  min-height: 4rem;
  height: 10vw;

  max-width: 100px;
  max-height: 100px;

  &:hover, &:focus {
    background: ${({ theme }) => darken(0.2, theme.button.background.primary)};
  }
`;

export const ActionMenu = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem 0;

  > main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;
