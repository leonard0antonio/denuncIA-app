import { useEffect, useState } from "react";
import api from "../../api/client";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled(Link)`
  display: block;
  padding: 16px;
  margin-bottom: 14px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ddd;
  text-decoration: none;
  color: #333;
`;

export default function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/reports/").then((r) => setReports(r.data));
  }, []);

  return (
    <Layout>
      <h1>Denúncias</h1>
      {reports.map((rep: any) => (
        <Card key={rep.id} to={`/reports/${rep.id}`}>
          <strong>{rep.title}</strong>
          <p>{rep.description}</p>
        </Card>
      ))}
    </Layout>
  );
}
