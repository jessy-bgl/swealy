import { useTranslation } from "react-i18next";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Container,
  ListItemButton,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VerifyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getExchangeLogo } from "../../utils/exchange";
import { UpdateExchangeDialog } from "./UpdateExchangeDialog";
import { CreateExchangeDialog } from "./CreateExchangeDialog";
import { DeleteExchangeDialog } from "./DeleteExchangeDialog";
import { useExchanges } from "./hooks/useExchanges";

const Exchanges = () => {
  const { t } = useTranslation(["common", "exchange"]);

  const {
    openCreateDialog,
    updateDialog,
    deleteDialog,
    data,
    isLoading,
    handleOpenUpdateDialog,
    handleClickApiKeysCheck,
    handleCloseUpdateDialog,
    handleCloseCreateDialog,
    handleOpenCreateDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
  } = useExchanges();

  if (isLoading) return <div />;

  return (
    <>
      <Container maxWidth="sm">
        <List>
          {data?.map((exchange) => (
            <ListItem divider key={exchange.label}>
              <ListItemAvatar>
                <Avatar>
                  <img
                    src={getExchangeLogo(exchange.name)}
                    alt={`${exchange.name}_logo`}
                    width={25}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={exchange.label}
                secondary={
                  exchange.subaccountName
                    ? `${exchange.name.toUpperCase()} - ${
                        exchange.subaccountName
                      }`
                    : exchange.name.toUpperCase()
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title={t("keysCheck") as string}>
                  <IconButton
                    color="primary"
                    onClick={() => handleClickApiKeysCheck(exchange.id)}
                  >
                    <VerifyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("editExchange") as string}>
                  <IconButton
                    color="warning"
                    onClick={() => handleOpenUpdateDialog(exchange)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("removeExchange") as string}>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(exchange)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItemButton onClick={handleOpenCreateDialog}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={t("exchange:addExchange")} />
          </ListItemButton>
        </List>
      </Container>

      {openCreateDialog && (
        <CreateExchangeDialog onClose={handleCloseCreateDialog} />
      )}

      {updateDialog.open && (
        <UpdateExchangeDialog
          data={updateDialog.data}
          onClose={handleCloseUpdateDialog}
        />
      )}

      {deleteDialog.open && (
        <DeleteExchangeDialog
          data={deleteDialog.data}
          onClose={handleCloseDeleteDialog}
        />
      )}
    </>
  );
};

export { Exchanges };
