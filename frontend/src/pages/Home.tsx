import Layout from "../component/Layout";
import Button from "../component/Button";
import { motion } from "framer-motion";
import styled from "styled-components";

const Title = styled(motion.h1)`
  margin-bottom: 20px;
  font-size: 26px;
  color: #222;
`;

export default function Home() {
  return (
    <Layout>
      <Title initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Denuncie problemas urbanos
      </Title>

      <Button>Criar denúncia</Button>
    </Layout>
  );
}
