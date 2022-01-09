import { Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TooltipNavIconButtonProps {
  title: string;
  muiIcon: any;
  linkToNavigate?: string;
}

const TooltipNavIconButton = (props: TooltipNavIconButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.linkToNavigate) {
      navigate(props.linkToNavigate);
    }
  };

  return (
    <Tooltip title={props.title} arrow>
      <IconButton size="large" color="inherit" onClick={handleClick}>
        {props.muiIcon}
      </IconButton>
    </Tooltip>
  );
};

export default TooltipNavIconButton;
