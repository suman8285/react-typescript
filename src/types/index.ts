import { IThemeState } from 'styles/theme/types';
import { IAuthState } from 'app/containers/Login/types';
import { IRegisterState } from 'app/containers/REGISTER/types';
import { ITransferState } from 'app/containers/Transfer/types';
import { IDashboardState } from 'app/containers/Dashboard/types';
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually.
*/
export interface IRootState {
  theme?: IThemeState;
  auth: IAuthState;
  register: IRegisterState;
  transfer: ITransferState;
  balance: IDashboardState;
}
