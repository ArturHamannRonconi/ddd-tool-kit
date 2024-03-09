export interface IUnidirectionalMapper<L, R> {
  toRightSide: (leftSide: L) => R;
}
