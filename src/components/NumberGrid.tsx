import { GridList, GridListTile, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";
import * as React from "react";

export enum CardStatus {
  Unchecked,
  Checked
}
export type Card = Record<number, CardStatus>;

type NumberGridProps = {
  numbers: Card;
  handler: (num: number) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1.5),
      textAlign: "center",
      fontSize: "1.2em",
      cursor: "pointer",
      userSelect: "none",
      "&:hover": {
        backgroundColor: fade(theme.palette.primary.dark, 0.3)
      }
    },
    checked: {
      backgroundColor: "rgba(64, 255, 192, 0.1)",
      color: "rgba(64, 255, 192, 0.9)"
    }
  })
);

export function NumberGrid({ numbers, handler }: NumberGridProps) {
  const classes = useStyles();

  return (
    <GridList cols={10} spacing={3} cellHeight={50}>
      {Object.entries(numbers).map(([n, s]: [string, CardStatus]) => {
        return (
          <GridListTile key={n} cols={1}>
            <Paper
              className={clsx(
                classes.paper,
                s === CardStatus.Checked && classes.checked
              )}
              variant="outlined"
              elevation={0}
              square
              onClick={() => handler(Number(n))}
            >
              {n.padStart(2, "0")}
            </Paper>
          </GridListTile>
        );
      })}
    </GridList>
  );
}
