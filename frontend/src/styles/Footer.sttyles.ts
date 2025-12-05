import styled from "styled-components";

export const Wrapper = styled.footer`
  width: 100%;
  margin-top: 50px;
  background: var(--card);
  border-top: 1px solid var(--border);
  color: var(--text);
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div``;

export const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Text = styled.p`
  color: var(--muted);
  margin-bottom: 10px;
  line-height: 1.6;
`;

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 5px;
`;

export const Item = styled.li`
  margin-bottom: 8px;
`;

export const FooterLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const Bottom = styled.div`
  margin-top: 40px;
  padding-top: 25px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  color: var(--muted);
  text-align: center;
`;