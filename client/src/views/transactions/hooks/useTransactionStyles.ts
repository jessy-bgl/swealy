import { createTheme, darken, lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const defaultTheme = createTheme();

const useTransactionStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

    return {
      root: {
        "& .transaction-success": {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.success.main
            ),
          },
        },
        "& .transaction-fail": {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
      },
    };
  },
  { defaultTheme }
);

export { useTransactionStyles };
