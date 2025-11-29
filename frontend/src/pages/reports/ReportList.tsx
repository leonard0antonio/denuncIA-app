import api from "../../api/client";
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
  ActionBtn,
} from "../../styles/ReportList.Styles";
import { FiFileText, FiEdit, FiTrash2 } from "react-icons/fi";

type Denuncia = {
  protocolo: string;
  categoria: string;
  descricao: string;
};

export default function ReportList() {
  //const [data, setData] = useState<any[]>([]);
  const [data, setData] = useState<Denuncia[]>([]);
 useEffect(() => {
    function load() {
      const arr = JSON.parse(
        localStorage.getItem("denuncias") || "[]"
      ) as Denuncia[];
      const ordered = [...arr].reverse();
      setData(ordered);
    }

    load();
  }, []);


//#TODO: LEMBRAR DE APAGAR DEPOIS

    const getDenuncias = () => {
    api.get("api/denuncias/")
    .then((res) => res.data)
    .then((data) => { setData(data); console.log(data) })
    .catch((err) => alert(err))

  }

  
  useEffect(() =>{
    getDenuncias()
  }, [])

  return (
     <Layout>
      <Title>Denúncias locais</Title>

      <Wrapper>
        {data.length === 0 && <Empty>Nenhuma denúncia local.</Empty>}

        {data.map((d) => (
          <Card key={d.protocolo}>
            <Link
              to={`/denuncias/${d.protocolo}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconRow>
                <CardIcon>
                  <FiFileText size={18} />
                </CardIcon>
                <CardTitle>{d.categoria}</CardTitle>
              </IconRow>

              <CardDesc>{d.descricao}</CardDesc>
              <Protocol>Protocolo: {d.protocolo}</Protocol>
            </Link>

            <Actions>
              <Link to={`/denuncias/${d.protocolo}/edit`}>
                <ActionBtn>
                  <FiEdit size={16} />
                  Editar
                </ActionBtn>
              </Link>

              <Link to={`/reports/${d.protocolo}/delete`}>
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
