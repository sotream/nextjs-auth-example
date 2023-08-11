export const RobotoFlex = () => (
  <>
    <link
      rel = 'preload'
      href = '/fonts/RobotoFlex/RobotoFlex.ttf'
      as = 'font'
      crossOrigin = 'anonymous'
    />
    { /* eslint-disable-next-line react/no-danger */ }
    <style
      dangerouslySetInnerHTML = { {
        __html: `
        @font-face {
          font-family: 'Roboto Flex';
          font-weight: 125 950;
          font-stretch: 75% 125%;
          font-style: normal;
          src: url('/fonts/RobotoFlex/RobotoFlex.ttf') format('woff2');
        }`,
      } }
    />
  </>
);
