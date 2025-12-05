import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";

import {
  Card,
  Title,
  Text,
  ButtonRow,
  Confirm,
  Cancel,
} from "../../styles/ReportDelete.Styles";
import api from "../../api/client";

// Defina o tipo da denúncia
type Denuncia = {
  protocolo: string;
  // caso tenham outros campos, você pode adicioná-los aqui se quiser
};

export default function ReportDelete() {
  const { protocolo } = useParams();
  const navigate = useNavigate();

 async function remove() {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];


    const newArr = arr.filter((x) => x.protocolo !== protocolo);

    localStorage.setItem("denuncias", JSON.stringify(newArr));
     await api.delete(`api/denuncias/delete/${protocolo}/`)
    alert("Denúncia removida.");
    navigate("/denuncias");
  }

  return (
    <Layout>
      <Card>
        <Title>Excluir denúncia</Title>
        <Text>
          Tem certeza de que deseja excluir esta denúncia? Essa ação é irreversível.
        </Text>

        <ButtonRow>
          <Confirm onClick={remove}>Excluir</Confirm>
          <Cancel onClick={() => navigate(-1)}>Cancelar</Cancel>
        </ButtonRow>
      </Card>
    </Layout>
  );
}
