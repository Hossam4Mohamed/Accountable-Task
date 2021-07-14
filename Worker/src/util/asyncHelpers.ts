/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export async function runPromisesSequentially<K extends Function, T>(
  asyncFunctionsArray: K[],
  args?: T
): Promise<void> {
  return asyncFunctionsArray.reduce(
    async (startPromise: Promise<any>, asyncFunction: K) =>
      startPromise.then(() => asyncFunction(args)),
    Promise.resolve()
  );
}
