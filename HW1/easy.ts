// Реализация Pick из TypeScript.
export type MyPick<Type, Keys extends keyof Type> = {
  [key in Keys]: Type[key];
};

// Дженерик для массива, возвращающий тип его N элемента.
export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

// Дженерик для мамссива, первый элемент которого имеет тип Elem, а остальные элементы - тип массива в первом переданном параметре.
export type Unshift<ArrayType extends any[], Element> = [Element, ...ArrayType];

// Реализация Exclude из TypeScript.
export type MyExclude<T, U> = T extends U ? never : T;