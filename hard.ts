// Принимает строку S и проверяет, есть ли в ней символ _
// Если есть, делит строку на две части — до подчеркивания (Head) и после подчеркивания (Tail)
// Применяем рекурсию к Tail и используем Capitalize, чтобы сделать первый символ после подчеркивания заглавным, тем самым преобразуя snake_case в camelCase.
type SnakeToCamelCase<S extends string> =
  S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<SnakeToCamelCase<Tail>>}`
    : S;
    
// Проверяет, является ли тип объектом.
// Если это объект, применяет преобразование к его ключам с помощью SnakeToCamelCase.
// Рекурсивно вызывает Camelize для значений каждого свойства, чтобы обработать вложенные объекты.
export type Camelize<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: Camelize<T[K]>;
    }
  : T;

// Реализация Pick из TypeScript.
export type DeepPick<T, Paths> = Paths extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? { [K in Key]: DeepPick<T[K], Rest> }
    : never
  : Paths extends keyof T
  ? { [K in Paths]: T[K] }
  : never;