import {
  PureComponent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import withStyles, { Styles } from "react-jss";

// 1. Нажать кнопку с помощью таба, сделать так чтобы когда на нее наводишься табом была синяя обводка
// которая не изменяет ширину элемента

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
    counter: 0,
  };
  render(): ReactNode {
    const { classes = {} } = this.props;

    return (
      <div>
        <button
          onClick={(e) => {
            if (e.detail === 0) {
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
  const [state, setState] = useState({ value: 0 });

  const items = Array.from({ length: 777777 }).map(() => ({
    foo: 1,
    bar: 2,
  }));

  // 2. В каком порядке выполнятся условия? Как сделать так, чтобы стало state.value = 4? Почему?
  useLayoutEffect(() => {
    setState({ value: 2 });
  }, []);

  useEffect(() => {
    setState({ value: state.value + 1 });
  }, []);

  useEffect(() => {
    async function run() {
      await new Promise((r) => setTimeout(r, 300));
      setState({ value: state.value + 1 });
    }
    run();
  }, []);

  return (
    <div>
      {state.value}
      <div
        style={{
          background: "yellow",
          color: "black",
          width: "fit-content",
          padding: "12px",
        }}
      >
        {items.length} items!
      </div>
      {state.value >= 4 && (
        <Timer
          onTick={() => setState((state) => ({ value: state.value + 1 }))}
        />
      )}
    </div>
  );
};

// 3. Почему интервал стоит 10мс, но обновления редкие?
const Timer = ({ onTick }: { onTick: () => void }) => {
  useEffect(() => {
    const i = setInterval(onTick, 10);
    return () => clearInterval(i);
  }, []);
  return null;
};
