import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NativeBaseProvider, extendTheme } from "native-base";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
ReactDOM.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
