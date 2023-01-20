interface NormalizeNullFieldsOptions {
  allowZero?: boolean;
}

export function normalizeNullFields<T>(
  arg: T,
  options: NormalizeNullFieldsOptions = { allowZero: false },
): T {
  const obj: { [index: string]: string } = {};
  Object.keys(arg).forEach((item) => {
    if (arg[item] || (options.allowZero && arg[item] == 0)) {
      obj[item] = arg[item];
    }
  });
  return obj as T;
}
