import Layout from "../../component/Layout";
import { Button } from "../../component/Button";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import api from "../../api/client";

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export default function ReportCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await api.post("/reports/", {
      title,
      description,
    });
    alert("Denúncia enviada!");
  };

  return (
    <Layout>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Criar Denúncia
      </motion.h1>

      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={handleSubmit}>Enviar</Button>
    </Layout>
  );
}
