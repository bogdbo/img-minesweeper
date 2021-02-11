import { Provider } from "react-redux";
import React from "react";
import styled from "styled-components";
import { Minesweeper } from "./minesweeper";
import { rootStore } from "./rootStore";

function App() {
  return (
    <Provider store={rootStore}>
      <AppHost>
        <Minesweeper />
      </AppHost>
    </Provider>
  );
}

export default App;

const AppHost = styled.div`
  display: flex;
  justify-content: center;
`;
