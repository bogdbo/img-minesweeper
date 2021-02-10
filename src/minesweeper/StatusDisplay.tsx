import styled from "styled-components";
import { GameStatus } from "./types";

export function StatusDisplay({ status }: { status: GameStatus }) {
  let icon = null;
  let message = null;
  switch (status) {
    case GameStatus.won:
      icon = "🥳";
      message = `You've won!`;
      break;
    case GameStatus.lost:
      icon = "😿";
      message = `You've lost.`;
      break;
    case GameStatus.notStarted:
      icon = "🤔";
      message = `👈️ Press start`;
      break;
    case GameStatus.ongoing:
      icon = "🔍️";
      message = `Digging`;
  }

  return (
    <GameStatusDisplayHost>
      <p>{icon}</p>
      <Message>{message}</Message>
    </GameStatusDisplayHost>
  );
}

export const GameStatusDisplayHost = styled.div`
  margin: 0 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 40px;
  flex: 0 0 250px;
`;

export const Message = styled.span`
  font-size: 30px;
`;
