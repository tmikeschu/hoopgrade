import { Ok, Err } from "space-monad";

export const toResult = <T, E>(fn: () => T) => {
  try {
    return Ok(fn());
  } catch (error) {
    return Err(error as E);
  }
};

export const toResultAsync = async <T, E>(fn: () => Promise<T>) => {
  try {
    return Ok(await fn());
  } catch (error) {
    return Err(error as E);
  }
};
