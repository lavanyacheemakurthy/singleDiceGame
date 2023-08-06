export default function App() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: "auto", background: "#fff", display: "block" }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <defs>
          <filter
            id="ldio-zolqqk8cioo-filter"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="10"></feGaussianBlur>
            <feComponentTransfer result="cutoff">
              <feFuncA type="linear" slope="125" intercept="-75"></feFuncA>
            </feComponentTransfer>
          </filter>
        </defs>
        <g filter="url(#ldio-zolqqk8cioo-filter)">
          <circle cx="30" cy="50" r="10" fill="#fe718d">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="18;25;18"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="20;27;20"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline"
            ></animate>
          </circle>
          <circle cx="70" cy="50" r="10" fill="#46dff0">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="25;18;25"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="66;73;66"
              keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              calcMode="spline"
            ></animate>
          </circle>
        </g>
      </svg>
    );
  }
  // https://loading.io/spinner/gooey-ball-2/-ball-gooey-bounce
  