import {
  Avatar,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import StartIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import PauseIcon from "@mui/icons-material/Pause";
import ArchiveIcon from "@mui/icons-material/Archive";

import { Dca, DcaStatusEnum } from "../../models/Dca";
import { getExchangeLogo } from "../../utils/exchange";
import { useBotConfig } from "../../utils/useBotConfig";
import { useUpdateDcaStatus } from "../../hooks/useDcaQueries";
import { useTranslation } from "react-i18next";

type Props = {
  data: Dca;
  onClickEdit: () => void;
};

type BotActionButton = {
  color: string;
  icon: any;
  label: string;
  onClick: () => void;
};

const BotInfo = ({ data, onClickEdit }: Props) => {
  const { palette } = useTheme();
  const { t } = useTranslation(["dca", "common"]);
  const { botConfigSummary } = useBotConfig(data);
  const updateDcaStatusQuery = useUpdateDcaStatus();

  const handleClickUpdateStatus = (status: DcaStatusEnum) => {
    if (data) updateDcaStatusQuery.mutate({ id: data.id, status });
  };

  const getActions = (): BotActionButton[] => {
    if (data.status === DcaStatusEnum.ACTIVE)
      return [
        {
          color: palette.warning.main,
          icon: <PauseIcon />,
          label: t("action.pause"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.PAUSED),
        },
        {
          color: palette.error.main,
          icon: <ArchiveIcon />,
          label: t("action.archive"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ARCHIVED),
        },
      ];
    else if (data.status === DcaStatusEnum.PAUSED)
      return [
        {
          color: palette.success.main,
          icon: <StartIcon />,
          label: t("action.activate"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ACTIVE),
        },
        {
          color: palette.error.main,
          icon: <ArchiveIcon />,
          label: t("action.archive"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ARCHIVED),
        },
      ];
    else if (data.status === DcaStatusEnum.ARCHIVED)
      return [
        {
          color: palette.success.main,
          icon: <StartIcon />,
          label: t("action.activate"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.ACTIVE),
        },
        {
          color: palette.warning.main,
          icon: <PauseIcon />,
          label: t("action.pause"),
          onClick: () => handleClickUpdateStatus(DcaStatusEnum.PAUSED),
        },
      ];
    else return [];
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <img
                  src={getExchangeLogo(data.exchange.name)}
                  alt={data.exchange.label}
                  width="25"
                />
              </Grid>
              <Grid item>
                <Typography>
                  {data.exchange.label} - {data.pair}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary">{botConfigSummary}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title={t("common:edit") as string}>
              <IconButton onClick={onClickEdit}>
                <Avatar
                  sx={{
                    backgroundColor: "transparent",
                    border: `solid 1px ${palette.primary.main}`,
                    color: `${palette.primary.main}`,
                  }}
                >
                  <EditIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Grid>
          {getActions().map((button) => (
            <Grid item>
              <Tooltip title={button.label}>
                <IconButton onClick={button.onClick}>
                  <Avatar
                    sx={{
                      backgroundColor: "transparent",
                      border: `solid 1px ${button.color}`,
                      color: `${button.color}`,
                    }}
                  >
                    {button.icon}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { BotInfo };
