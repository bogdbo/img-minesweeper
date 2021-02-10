import { FormEvent } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { startGame } from "./slice";

export function Settings() {
  const dispatch = useDispatch();

  // note: Keeping it simple and using uncontrolled components, I would normally formik or react-hook-form
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const widthInput = e.currentTarget[0] as HTMLInputElement;
    const heightInput = e.currentTarget[1] as HTMLInputElement;
    const maximumMinesInput = e.currentTarget[2] as HTMLInputElement;

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const maximumMines = parseInt(maximumMinesInput.value);
    dispatch(startGame({ width, height, maximumMines }));
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
