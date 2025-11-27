import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`font-size:28px;margin-bottom:16px;`;

export default function Home() {
  return (
    <Layout>
      <Title>Denuncie problemas urbanos</Title>
      <Link to="/reports/new">
        <button style={{padding:'10px 14px', borderRadius:8, border:'none', background:'var(--primary)', color:'#fff'}}>Criar denúncia</button>
      </Link>
    </Layout>
  );
}
