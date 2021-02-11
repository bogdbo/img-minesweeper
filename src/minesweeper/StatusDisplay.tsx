import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../rootStore";
import { GameStatus } from "./types";

export function StatusDisplay() {
  const status = useSelector((state: RootStore) => state.minesweeper.status);
  const isMousePressed = useSelector(
    (state: RootStore) => state.minesweeper.isMousePressed
  );

  let icon = null;
  let message = null;
  switch (status) {
    case GameStatus.won:
      icon = "🥳";
      message = `You've won!`;
      break;
    case GameStatus.lost:
      icon = "😵";
      message = `You've lost.`;
      break;
    case GameStatus.notStarted:
      icon = "🤔";
      message = `👈️ Press start`;
      break;
    case GameStatus.ongoing:
      icon = isMousePressed ? "😲" : "😐️️";
      message = null;
  }

  return (
    <GameStatusDisplayHost>
      <p>{icon}</p>
      <Message>{message}</Message>
    </GameStatusDisplayHost>
  );
}

export const GameStatusDisplayHost = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 25px;
  flex: 0 0 150px;
`;

export const Message = styled.span`
  font-size: 15px;
`;
