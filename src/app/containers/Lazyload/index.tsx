import { lazyLoad } from 'utils/loadable';

export const LoginView = lazyLoad(
  () => import('../Login'),
  module => module.Login,
);

export const PageNotFound = lazyLoad(
  () => import('../PageNotFound'),
  module => module.PageNotFound,
);

export const RegisterView = lazyLoad(
  () => import('../REGISTER'),
  module => module.REGISTER,
);

export const DashboardView = lazyLoad(
  () => import('../Dashboard'),
  module => module.Dashboard,
);

export const TransferView = lazyLoad(
  () => import('../Transfer'),
  module => module.Transfer,
);
