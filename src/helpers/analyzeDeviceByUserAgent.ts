import isMobileDevice from 'ismobilejs';

type FuncReturn = { isMobile: boolean; isTablet: boolean; isDesktop: boolean };

export const analyzeDeviceByUserAgent = (userAgent: string): FuncReturn => {
  const detectedAgent = isMobileDevice(userAgent);
  const isMobile = detectedAgent.phone;
  const isTablet = detectedAgent.tablet;
  const isAnyMobile = detectedAgent.any;
  const isDesktop = !isAnyMobile;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
