import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import {
  Wrapper,
  Title,
  Empty,
  Card,
  CardTitle,
  CardDesc,
  Protocol,
  IconRow,
  CardIcon,
  Actions,
  ActionBtn
} from "../../styles/ReportList.Styles";
import { FiFileText, FiEdit, FiTrash2 } from "react-icons/fi";

export default function ReportList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    setData(arr.reverse());
  }, []);

  return (
    <Layout>
      <Title>Denúncias locais</Title>

      <Wrapper>
        {data.length === 0 && <Empty>Nenhuma denúncia local.</Empty>}

        {data.map((d) => (
          <Card key={d.id}>
            <Link
              to={`/reports/${d.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconRow>
                <CardIcon>
                  <FiFileText size={18} />
                </CardIcon>
                <CardTitle>{d.title}</CardTitle>
              </IconRow>

              <CardDesc>{d.description}</CardDesc>
              <Protocol>Protocolo: {d.protocol}</Protocol>
            </Link>

            {/* 🔥 AÇÕES */}
            <Actions>
              <Link to={`/reports/${d.id}/edit`}>
                <ActionBtn>
                  <FiEdit size={16} />
                  Editar
                </ActionBtn>
              </Link>

              <Link to={`/reports/${d.id}/delete`}>
                <ActionBtn danger>
                  <FiTrash2 size={16} />
                  Excluir
                </ActionBtn>
              </Link>
            </Actions>
          </Card>
        ))}
      </Wrapper>
    </Layout>
  );
}
