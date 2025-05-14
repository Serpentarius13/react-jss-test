import {
  PureComponent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import withStyles, { Styles } from "react-jss";

const styles: Styles = {
  button: {
    color: "red",
    "&:hover": {
      color: "blue",
    },
    padding: "1rem",
    pointerEvents: "none",
  },
};

// @ts-expect-error ts-migrate(1238) FIXME: Type 'undefined' is not assignable to type '{ temp... Remove this comment to see the full error message
@withStyles(styles)
export class AppComponent extends PureComponent<{
  classes?: Record<string, string>;
}> {
  state = {
    opened: false,
  };
  render(): ReactNode {
    const { classes = {} } = this.props;

    return (
      <div>
        <button
          onClick={(e) => {
            if (e.detail > 0) {
              this.setState({ opened: true });
            }
          }}
          tabIndex={-1}
          className={classes.button}
        >
          button
        </button>
        {this.state.opened && <Section />}
      </div>
    );
  }
}

const Section = () => {
  const [state, setState] = useState(() => ({ value: 1 }));

  useLayoutEffect(() => {
    setState((v) => ({ value: 2 }));
  }, []);

  useEffect(() => {
    setState({ value: state.value + 1 });
  }, []);

  useEffect(() => {
    async function run() {
      await new Promise((r) => setTimeout(r, 400));
      setState({ value: state.value + 1 });
    }
    run();
  }, []);

  return <div>{state.value}</div>;
};
