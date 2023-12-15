import styled from "styled-components";

export const TopBarContainer = styled.nav`
    display: flex;
    width: 100%;
    padding: 0.5rem 1rem;
    justify-content: space-between;
    align-items: center;  

  > span {
    flex: 1;
    font-weight: 400;

    > b {
      font-size: 1.25rem;
      font-weight: 800;
    }
  }
`;
