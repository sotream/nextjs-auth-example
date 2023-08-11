/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export const absoluteUrl = (req: any, setLocalhost = false) => {
  let protocol = 'https:';
  let host = req
    ? req.headers[ 'x-forwarded-host' ] || req.headers.host
    : window.location.host;

  if (typeof host === 'string' && host.includes('localhost')) {
    if (setLocalhost) {
      host = setLocalhost;
    } else {
      protocol = 'http:';
    }
  }

  return {
    protocol: protocol,
    host:     host,
    origin:   protocol + '//' + host,
    url:      req,
  };
};
