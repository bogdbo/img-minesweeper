import React from "react";
import styled from "styled-components";
import { Minesweeper } from "./minesweeper";

function App() {
  return (
    <AppHost>
      <Minesweeper />
    </AppHost>
  );
}

export default App;

const AppHost = styled.div`
  display: flex;
  justify-content: center;
`;
