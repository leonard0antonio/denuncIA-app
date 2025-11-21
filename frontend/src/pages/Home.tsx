import { Button } from "../component/Button";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Denuncie problemas urbanos</h1>
      <Button to="/reports/new">Criar denúncia</Button>
    </div>
  );
}
