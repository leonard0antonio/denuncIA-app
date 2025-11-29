import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1100px;
  margin: 24px auto;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }
`;
