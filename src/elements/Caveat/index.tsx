export const Caveat = () => (
  <>
    <link
      rel = 'preload'
      href = '/fonts/Caveat/Caveat-Bold.ttf'
      as = 'font'
      crossOrigin = 'anonymous'
    />
    { /* eslint-disable-next-line react/no-danger */ }
    <style
      dangerouslySetInnerHTML = { {
        __html: `
        @font-face {
          font-family: 'Caveat';
          font-weight: 700;
          src: url('/fonts/Caveat/Caveat-Bold.ttf') format('woff2');
        }`,
      } }
    />
  </>
);
