import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
import Layout from "../../component/Layout";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    api.get(`/reports/${id}/`).then((r) => setReport(r.data));
  }, [id]);

  if (!report) return <Layout>Carregando...</Layout>;

  return (
    <Layout>
      <h1>{report.title}</h1>
      <p>{report.description}</p>
    </Layout>
  );
}
