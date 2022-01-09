import { IconButton, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MenuItemIconButtonProps {
  name: string;
  muiIcon: any;
  linkToNavigate?: string;
  action?: Function;
}

const MenuItemIconButton = (props: MenuItemIconButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.linkToNavigate) {
      navigate(props.linkToNavigate);
    } else if (props.action) props.action();
  };

  return (
    <MenuItem onClick={handleClick}>
      <IconButton size="large" color="inherit">
        {props.muiIcon}
      </IconButton>
      <p>{props.name}</p>
    </MenuItem>
  );
};

export default MenuItemIconButton;
