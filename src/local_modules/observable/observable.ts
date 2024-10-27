const Observable = <T = unknown>(pipes: Function[]) => {
  let observers: Function[] = [];
  let open = true;

  const subscribe = (observer: Function) => {
    observers.push(observer);
  };

  const notify = (data: T) => {
    if (!open) {
      return;
    }

    const pipedData = pipes.reduce((acc, pipe) => pipe(acc), data) as T;
    observers.forEach((observer) => {
      observer(pipedData);
    });
  };

  return {
    subscribe,
    notify,
    pipe: (pipe: Function) => Observable([pipe, ...pipes]),
    close: () => {
      open = false;
    },
  };
};
