import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface ListItemWithIconProps {
  name: string;
  muiIcon: any;
  onClick: any;
  disabled?: boolean;
  selected?: boolean;
}

const ListItemTextIcon = (props: ListItemWithIconProps) => {
  return (
    <ListItem
      button
      disabled={props.disabled}
      onClick={props.onClick}
      selected={props.selected}
    >
      <ListItemIcon>{props.muiIcon}</ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

export default ListItemTextIcon;
