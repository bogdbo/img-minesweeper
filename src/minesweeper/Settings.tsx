import { FormEvent } from "react";
import styled from "styled-components";

interface GameSettingsProps {
  onGameStart: (width: number, height: number, maximumMines: number) => void;
}

export function Settings({ onGameStart }: GameSettingsProps) {
  // note: Keeping it simple and using uncontrolled components, I would normally formik or react-hook-form
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const width = e.currentTarget[0] as HTMLInputElement;
    const height = e.currentTarget[1] as HTMLInputElement;
    const maximumMines = e.currentTarget[2] as HTMLInputElement;

    onGameStart(
      parseInt(width.value),
      parseInt(height.value),
      parseInt(maximumMines.value)
    );
  }

  return (
    <GameSettingsForm onSubmit={handleSubmit}>
      <label>Height</label>
      <input
        type="number"
        placeholder="Height"
        max="50"
        name="height"
        defaultValue={16}
      />
      <label>Width</label>
      <input
        type="number"
        placeholder="Width"
        max="50"
        name="width"
        defaultValue={16}
      />
      <label>Number of mines</label>
      <input
        type="number"
        placeholder="Number of mines"
        name="maximumMines"
        defaultValue={40}
      />
      <input type="submit" value="Start new game" />
    </GameSettingsForm>
  );
}

const GameSettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  > * {
    margin: 3px 0;
  }
`;
