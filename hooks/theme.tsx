import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import red from "@material-ui/core/colors/red";
import { useState, useEffect } from "react";
export default function Theme() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(true);
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  )
    setPrefersDarkMode(false);
  else setPrefersDarkMode(true);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newColorScheme = e.matches
        ? setPrefersDarkMode(true)
        : setPrefersDarkMode(false);
    });
  return createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: indigo,
      secondary: red,
    },
  });
}
