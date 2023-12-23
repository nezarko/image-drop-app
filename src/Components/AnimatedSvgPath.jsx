import { useEffect, useRef } from "react";

const AnimatedSvgPath = ({
  startColor,
  endColor,
  from,
  to,
  dur,
  begin,
  fillid,
  play,
  restart = "always",
  fill,
  stroke,
  ...props
}) => {
  /**
   *
   *
   */
  const animationRef = useRef(null);
  const refPath = useRef(null);
  useEffect(() => {
    if (play && stroke === undefined) animationRef.current.beginElement();

    if(play && stroke) refPath.current.classList.add("animate-stroke");
  }, [play]);
  return (
    <>
      {/* Animation */}
      <defs>
        <linearGradient id={fillid}>
          <stop offset="0%" stopColor={startColor}>
            <animate
              //   className="left-in"
              ref={animationRef}
              dur={dur}
              attributeName="offset"
              fill="freeze"
              from={from}
              to={to}
              restart={restart}
              begin={begin}
            />
          </stop>
          <stop offset="0%" stopColor={endColor} >
            <animate
              dur={dur}
              attributeName="offset"
              fill="freeze"
              from={from}
              to={to}
              restart={restart}
              begin={begin}
            />
          </stop>
        </linearGradient>
      </defs>

      <path ref={refPath} fill={`url(#${fillid})`} stroke={stroke} {...props} />
    </>
  );
};

export default AnimatedSvgPath;
