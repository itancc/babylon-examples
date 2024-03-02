import { createContext, useContext } from "react";

export const OneFrameContext = createContext(false);

export const useOneFrame = () => {
  const oneFrame = useContext(OneFrameContext);
  return oneFrame;
};
