type Observer<T> = (data: T) => void;
type Pipe<T, K> = (data: T) => K;

interface Notifier<T> {
  (data: T): void;
}

interface Observable<T> {
  subscribe: (observer: Observer<T>) => () => void;
  subscribeDone: (observer: () => void) => void;
  pipe: <K>(pipe: Pipe<T, K>) => Observable<K>;
  notify: Notifier<T>;
  done: () => void;
  readonly closed: boolean;
}

const Observable = <T>(
  pipes?: [...Pipe<unknown, unknown>[], Pipe<unknown, T>]
): Observable<T> => {
  const observers: Parameters<Observable<T>['subscribe']>[0][] = [];
  const doneObservers: Parameters<Observable<T>['subscribeDone']>[0][] = [];

  let open = true;

  const subscribe = (observer: Observer<T>) => {
    observers.push(observer);
    return () => {
      const idx = observers.indexOf(observer);
      if (idx !== -1) {
        observers.splice(idx, 1);
      }
    };
  };

  const subscribeDone = (
    observer: Parameters<Observable<T>['subscribeDone']>[0]
  ) => {
    doneObservers.push(observer);
  };

  const notify = (data: T) => {
    if (!open) {
      return;
    }

    // Apply pre-built pipe chain if any
    const pipedData =
      pipes && pipes.length > 0
        ? (pipes.reduce(
            (acc: unknown, pipe) => pipe(acc),
            data as unknown
          ) as T)
        : data;

    for (const observer of observers) {
      observer(pipedData);
    }
  };

  return {
    subscribe,
    subscribeDone,
    notify,
    pipe: <K>(pipe: Pipe<T, K>) =>
      Observable<K>([...(pipes ?? []), pipe as Pipe<unknown, K>]),
    done: () => {
      if (!open) {
        return;
      }

      open = false;
      observers.length = 0;

      let doneObserver: (() => void) | undefined;
      while ((doneObserver = doneObservers.shift())) {
        doneObserver();
      }
    },
    get closed() {
      return !open;
    },
  };
};

export { Observable };
