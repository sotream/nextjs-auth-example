// Store
import { setProfileData } from '../store/reducers/profile';

const withAuth = (store: any, _context: any, cb: () => any) => {
  // do auth logic

  store.dispatch(setProfileData({
    name: {
      uk: 'Джон Доу',
      en: 'John Dou'
    }
  }));

  return cb();
};

export { withAuth };
