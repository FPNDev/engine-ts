import { Observable } from "./observable";

function of(value?: never): Observable<never>;
function of<T>(value: T): Observable<T>;
function of<T>(value?: T): Observable<T | never> {
  const obs = new Observable<T>();
  if (value !== undefined) {
    obs.notify(value);
  }
  return obs;
}

const a = of();
const b = of('a');