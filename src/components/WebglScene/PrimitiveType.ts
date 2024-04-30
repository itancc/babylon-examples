export enum PrimitiveType {
  POINTS = 0x0000,
  LINES = 0x0001,
  LINE_LOOP = 0x0002,
  LINE_STRIP = 0x0003,
  TRIANGLES = 0x0004,
  TRIANGLE_STRIP = 0x0005,
  TRIANGLE_FAN = 0x0006,
}
Object.freeze(PrimitiveType);

export const isValidatePrimitiveType = (_type: number) => {
  if (typeof _type !== "number") return false;
  return Object.values(PrimitiveType).includes(_type);
};

export const isLinesPrimitiveType = (_type: number) => {
  return (
    _type === PrimitiveType.LINES ||
    _type === PrimitiveType.LINE_LOOP ||
    _type === PrimitiveType.LINE_STRIP
  );
};

export const isTrianglesPrimitiveType = (_type: number) => {
  return (
    _type === PrimitiveType.TRIANGLES ||
    _type === PrimitiveType.TRIANGLE_STRIP ||
    _type === PrimitiveType.TRIANGLE_FAN
  );
};
