/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from 'react';

interface IOpts {
  fallback: React.ReactNode;
}

type Unpromisify<T> = T extends Promise<infer P> ? P : never;

export const lazyLoad = <
  T extends Promise<any>,
  U extends React.ComponentType<any>
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: IOpts = { fallback: <div>Loading...</div> },
): ((props: React.ComponentProps<U>) => React.ReactElement) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = (): Promise<{ default: U }> =>
      importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  const lazyLoad = (props: React.ComponentProps<U>): React.ReactElement => (
    <Suspense fallback={opts.fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return lazyLoad;
};
