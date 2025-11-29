import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Hero = styled.div`
  background: var(--card);
  padding: 28px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);

  @media(max-width: 750px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const HeroImg = styled.img`
  width: 260px;
  border-radius: 12px;
  object-fit: cover;

  @media(max-width: 750px) {
    width: 100%;
  }
`;

export const HeroText = styled.div``;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 14px;
  color: var(--text-primary);
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  max-width: 580px;
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
`;

export const ActionButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: var(--primary);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.12);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 12px;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
`;

export const Card = styled.div`
  background: var(--card);
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-left: 5px solid var(--primary);
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;

export const CardText = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
`;
