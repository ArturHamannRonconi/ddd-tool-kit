export interface IBidirectionalMapper<L, R> {
  toRightSide: (leftSide: L) => R;
  toLeftSide: (rightSide: R) => L;
}
