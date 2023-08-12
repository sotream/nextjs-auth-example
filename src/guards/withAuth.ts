// Core
import { getCookies } from 'cookies-next';
import axios from 'axios';

// Store
import { setProfileData } from '../store/reducers/profile';

// Other
import { absoluteUrl } from '../helpers';

const withAuth = async (store: any, context: any, cb: () => any) => {
  try {
    const cookies = getCookies(context);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token } = cookies;
    const { origin } = absoluteUrl(context.req);
    const requestUrl = `${origin}/api/v1/me`;
    const { data } = await axios.post(requestUrl, { access_token });

    store.dispatch(setProfileData(data));

    return cb();
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent:   false,
      }
    };
  }
};

export { withAuth };
