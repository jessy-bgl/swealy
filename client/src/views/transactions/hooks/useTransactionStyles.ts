import { darken, lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";

const useTransactionStyles = () => {
  const appTheme: any = useTheme();

  return makeStyles(
    (theme) => {
      const getBackgroundColor = (color) =>
        appTheme.palette.mode === "dark"
          ? darken(color, 0.5)
          : lighten(color, 0.5);

      const getHoverBackgroundColor = (color) =>
        appTheme.palette.mode === "dark"
          ? darken(color, 0.5)
          : lighten(color, 0.5);

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
              backgroundColor: getHoverBackgroundColor(
                theme.palette.error.main
              ),
            },
          },
        },
      };
    },
    { defaultTheme: appTheme }
  );
};

export { useTransactionStyles };
