import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import {
  Wrapper,
  Title,
  Empty,
  ItemLink,
  Card,                           
  CardTitle,
  CardDesc,
  Protocol,
} from "../../styles/ReportList.Styles";

export default function ReportList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    setData(arr.reverse());
  }, []);

  return (
    <Layout>
      <Title>Denúncias locais</Title>

      {data.length === 0 && <Empty>Nenhuma denúncia local.</Empty>}

      <Wrapper>
        {data.map((d) => (
          <ItemLink key={d.id} to={`/reports/${d.id}`}>
            <Card>
              <CardTitle>{d.title}</CardTitle>
              <CardDesc>{d.description}</CardDesc>
              <Protocol>Protocolo: {d.protocol}</Protocol>
            </Card>
          </ItemLink>
        ))}
      </Wrapper>
    </Layout>
  );
}
