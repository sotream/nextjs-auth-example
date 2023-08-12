import { IProfile } from '../store/reducers/profile';
import { IAuth } from '../store/reducers/auth';
import { ISettings } from '../store/reducers/settings';

export type TStoreState = {
  readonly profile: IProfile,
  readonly auth: IAuth,
  readonly settings: ISettings,
}
