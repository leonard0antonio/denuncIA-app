import styled from "styled-components";
import GlobalStyle from "./styles/global";
import Home from "./pages/Home";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Home />
    </Container>
  );
}

export default App;
