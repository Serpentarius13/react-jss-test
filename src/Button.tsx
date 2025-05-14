import { PureComponent, ReactNode } from "react";
import withStyles, { Styles } from "react-jss";

const styles: Styles = {
  button: {
    color: "red",
    "&:hover": {
      color: "blue",
    },
    padding: "1rem",
  },
};

// @ts-expect-error ts-migrate(1238) FIXME: Type 'undefined' is not assignable to type '{ temp... Remove this comment to see the full error message
@withStyles(styles)
export class AppComponent extends PureComponent<{
  classes?: Record<string, string>;
}> {
  render(): ReactNode {
    const { classes = {} } = this.props;

    return (
      <button tabIndex={-1} className={classes.button}>
        button
      </button>
    );
  }
}
