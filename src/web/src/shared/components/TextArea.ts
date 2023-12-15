import styled from "styled-components";

export const TextArea = styled.textarea`
  border: solid 1px ${({ theme }) => theme.input.border.primary};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.input.background.primary};
  color: ${({ theme }) => theme.input.color.primary};  
  font-size: 1rem;
  height: 8rem;
  width: 100%;
  resize: none;
  overflow-y: auto;
`;
