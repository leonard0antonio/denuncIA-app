import styled from "styled-components";

export const Container = styled.div`
  background: var(--card);
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
`;

export const Title = styled.h2`
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 600;
`;

export const Text = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 14px;
`;

export const Label = styled.strong`
  color: var(--text-primary);
  font-weight: 600;
`;

export const ImageBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 500px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;
