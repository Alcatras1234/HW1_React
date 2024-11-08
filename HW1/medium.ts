// Тип для объекта, все ключи которого опциональны, включая вложенные объекты.
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// реализация Capitalize<T> из TypeScript 
export type MyCapitalize<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;


// Тип для объекта, который делает все ключи изменяемыми, включая вложенные объекты  
export type DeepMutable<T> = T extends object
  ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
  : T;

// Тип, возвращающий перечисление частей строк, являющимися параметрами URL-строки. 
export type ParseURLParams<StringElem extends string> =
  StringElem extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ParseURLParams<`/${Rest}`>
    : StringElem extends `${infer _Start}:${infer Param}`
    ? Param
    : never;
