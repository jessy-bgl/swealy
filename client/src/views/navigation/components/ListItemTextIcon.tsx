import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ListItemWithIconProps {
  name: string;
  muiIcon: any;
  closeDrawer: Function;
  linkToNavigate?: string;
  disabled?: boolean;
}

const ListItemTextIcon = (props: ListItemWithIconProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.linkToNavigate) {
      props.closeDrawer();
      navigate(props.linkToNavigate);
    }
  };

  return (
    <ListItem button disabled={props.disabled} onClick={handleClick}>
      <ListItemIcon>{props.muiIcon}</ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

export default ListItemTextIcon;
