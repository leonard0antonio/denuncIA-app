import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import {
  Title,
  Empty,
  CardLink,
  Card,
  CardTitle,
  CardDesc,
  Protocol
} from "../../styles/ReportList.Styles";

export default function ReportList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    setData(arr.reverse());
  }, []);

  return (
    <Layout>
      <Title>Denúncias Locais</Title>

      {data.length === 0 && <Empty>Nenhuma denúncia registrada.</Empty>}

      {data.map((d) => (
        <CardLink key={d.id} to={`/reports/${d.id}`}>
          <Card>
            <CardTitle>{d.title}</CardTitle>
            <CardDesc>{d.description}</CardDesc>
            <Protocol>Protocolo: {d.protocol}</Protocol>
          </Card>
        </CardLink>
      ))}
    </Layout>
  );
}
