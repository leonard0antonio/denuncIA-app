import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px; 
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 40px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding-top: 90px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;