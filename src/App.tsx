import { type ReactNode, type FC } from "react";
import { AppComponent } from "./Button";

interface Props {
  children?: ReactNode;
}

export const App: FC<Props> = ({}) => {
  return <AppComponent />;
};


