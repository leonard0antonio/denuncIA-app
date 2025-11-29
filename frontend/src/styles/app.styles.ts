import styled from "styled-components";

export const AppWrapper = styled.div`
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.toggleBackground || "#f9f9f9"};
  color: ${({ theme }) => theme.toggleColor || "#333"};
  display: flex;
  flex-direction: column;
`;
