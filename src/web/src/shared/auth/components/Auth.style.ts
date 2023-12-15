import styled from "styled-components";

export const AuthContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;
