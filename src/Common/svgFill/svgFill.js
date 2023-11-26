import {
  getRandomInRange,
  getNormalOfIndex,
  placePointOnRow,
  indexToT,
} from "./utils";

const createPath = ({ d, viewBox }) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("viewBox", `0 0 ${viewBox[0]} ${viewBox[1]}`);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", d);

  return path;
};

export const svgFill = ({
  itemsPerRow = 5,
  radius,
  randomFn = () => Math.random(),
  ...options
}) => {
  const path = createPath({ viewBox: options.viewBox, d: options.d });
  const pathLength = path.getTotalLength();
  const radiusPerRow = options.strokeWidth / itemsPerRow;
  const indexToTCalculator = (index) => indexToT({ pathLength, index, radius });

  const getPositionAtIndex = (index, others) => {
    const rowIndex = Math.floor(index / itemsPerRow);

    const normal = getNormalOfIndex(
      rowIndex,
      path,
      indexToTCalculator,
      options.strokeWidth
    );

    const p = placePointOnRow({
      start: normal.start,
      end: normal.end,
      others,
      column: index % itemsPerRow,
      itemsPerRow,
      radiusPerRow,
      randomFn,
    });

    return {
      x: p.x,
      y: p.y,
      normal,
      rotation: getRandomInRange(Math.random, -0.1, 0.1),
      zIndex: Math.ceil(randomFn() * 999),
    };
  };

  return {
    options,
    fill: getPositionAtIndex,
  };
};
