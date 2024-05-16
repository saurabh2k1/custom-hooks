import { useState } from 'react';

type ToggleState = boolean;
type ToggleAction = () => void;
type ToggleHook = [ToggleState, ToggleAction];

const useToggle = (initialValue: ToggleState = false): ToggleHook => {
  const [value, setValue] = useState<ToggleState>(initialValue);
  const toggle: ToggleAction = () => {
    setValue((prevValue: ToggleState) => !prevValue);
  };
  return [value, toggle];
};

export default useToggle;