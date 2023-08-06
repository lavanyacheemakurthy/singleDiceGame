export default function App({ children, handler }) {
    return (
      <button className="re-start" title="Replay game" onClick={() => handler()}>
        {children}
      </button>
    );
  }
  