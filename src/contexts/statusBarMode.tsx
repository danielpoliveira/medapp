import React, { createContext, useContext, useState } from 'react';

interface StatusBarModeData {
  mode: Mode;
  background: string;
  changeStatusBarMode: (mode: Mode) => void;
  changeStatusBarBackground: (color: string) => void;
}

interface Props {
  children: React.ReactNode;
}

const StatusBarModeContext = createContext<StatusBarModeData>({} as StatusBarModeData);

export const StatusBarModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<Mode>('dark');
  const [background, setBackground] = useState('#FFFFFF');

  const changeStatusBarMode = (_mode: Mode) => {
    if(_mode !== mode)
      setMode(_mode);
  }

  const changeStatusBarBackground = (_background: string) => {
    if(_background !== background)
      setBackground(_background);
  };

  return (
    <StatusBarModeContext.Provider value={{ mode, changeStatusBarMode, background, changeStatusBarBackground }}>
      {children}
    </StatusBarModeContext.Provider>
  );
}

export const useStatusBarMode = () => {
  const context = useContext(StatusBarModeContext);

  return context;
}