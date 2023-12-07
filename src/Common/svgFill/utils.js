export const getRandomInRange = (randomFn, min, max) =>
  min + randomFn() * (max - min);

export function getRandomPointAround(point, radius, factor) {
  const angle = factor * Math.PI * 2;
  if (angle === 0) {
    return point;
  }
  return {
    x: point.x + radius * Math.cos(angle),
    y: point.y + radius * Math.sin(angle),
  };
}

export const lerp = (start, end, t) => {
  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  if(typeof start === 'number') return lerp(start , end , t)
 
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t),
  };
};

export function getNormalOfIndex(
  index,
  path,
  indexToTCalculator,
  strokeWidth,
  flip = false
) {
  const pathLength = path.getTotalLength();
  const point = path.getPointAtLength(indexToTCalculator(index) * pathLength);
  const nextIndex = flip ? -1 : 1;

  let nextPoint = path.getPointAtLength(
    indexToTCalculator(index + nextIndex) * pathLength
  );

  const dx = nextPoint.x - point.x;
  const dy = nextPoint.y - point.y;
  const length = Math.sqrt(dx ** 2 + dy ** 2);
  if (length > strokeWidth * 2 && !flip) {
    return getNormalOfIndex(index, path, indexToTCalculator, strokeWidth, true);
  }
  const angle = Math.atan2(dy, dx) - (Math.PI / 2) * nextIndex;

  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const normalStart = {
    x: point.x + (strokeWidth / 2) * cos,
    y: point.y + (strokeWidth / 2) * sin,
  };

  return {
    start: normalStart,
    end: {
      x: 2 * point.x - normalStart.x,
      y: 2 * point.y - normalStart.y,
    },
  };
}

export const placePointOnRow = ({
  start,
  end,
  column,
  itemsPerRow,
  randomFn,
}) => {
  const positionAlongLine = column / (itemsPerRow - 1 || 1);
  const point = lerp(start, end, positionAlongLine);

  return getRandomPointAround(point, 2, randomFn(point.x, point.y));
};

export const indexToT = ({ pathLength, index, radius }) => {
  const numberOfCircles = pathLength / (radius * 2);
  return index / numberOfCircles;
};
