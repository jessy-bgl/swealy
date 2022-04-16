import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import DetailIcon from "@mui/icons-material/ExpandMore";

import { ExpandMore } from "../../../../components/Card/ExpandMore";
import { CurrenciesGlobalStats } from "../../../../models/Statistics";
import { useTranslation } from "react-i18next";

const COLORS = [
  "#4caf50",
  "#3f51b5",
  "#ffc107",
  "#f44336",
  "#9c27b0",
  "#cddc39",
  "#e91e63",
  "#2196f3",
  "#8bc34a",
];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const percent = Math.round(value * 100);

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
        <DetailIcon />
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 5}
        textAnchor={textAnchor}
        fill="#999"
      >{`${percent}%`}</text>
    </g>
  );
};

const AssetsAllocationStats = ({ data }: { data: CurrenciesGlobalStats }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const { t } = useTranslation("transaction");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (!data.length) return <div />;

  const pieData = data.map((d) => ({
    name: d.name,
    value: d.weight,
  }));

  return (
    <Card>
      <CardHeader
        title={<Typography>{t("stats.allocationTitle")}</Typography>}
        subheader={t("stats.allocationSubtitle")}
        sx={{ padding: 1, textAlign: "center" }}
      />

      <Divider />

      <CardContent sx={{ padding: 0 }}>
        <ResponsiveContainer height={240}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>

      <CardActions disableSpacing sx={{ padding: 0 }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <DetailIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={1}>
            {pieData.map((currency, index) => (
              <Grid item key={`currency-${index}`} xs={6}>
                <Typography>
                  {currency.name} : {Math.round(currency.value * 100)}%
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { AssetsAllocationStats };
