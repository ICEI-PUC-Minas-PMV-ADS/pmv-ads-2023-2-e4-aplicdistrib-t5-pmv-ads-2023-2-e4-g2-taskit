import styled from "styled-components";

export const AddTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40vw;
  max-width: 80vw;
  gap: 1rem;
  
  > form {
    flex: 1;
    display: flex;
    flex-direction: column;   
    gap: 1rem;

    > div, > footer {
      width: 100%;
      display: flex;
      gap: 1rem;
    }

    > footer {
      align-items: flex-end;
    }

    > div {
      flex-direction: column;
    }
  }
`;
