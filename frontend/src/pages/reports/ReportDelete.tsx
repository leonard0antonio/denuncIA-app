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

export default function ReportDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  function remove() {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    const newArr = arr.filter((x: any) => x.id !== id);
    localStorage.setItem("denuncias", JSON.stringify(newArr));
    alert("Denúncia removida.");
    navigate("/reports");
  }

  return (
    <Layout>
      <Card>
        <Title>Excluir denúncia</Title>
        <Text>
          Tem certeza de que deseja excluir esta denúncia? Essa ação é
          irreversível.
        </Text>

        <ButtonRow>
          <Confirm onClick={remove}>Excluir</Confirm>
          <Cancel onClick={() => navigate(-1)}>Cancelar</Cancel>
        </ButtonRow>
      </Card>
    </Layout>
  );
}
