// noinspection DuplicatedCode
// Core
import Document, { NextScript, Html, Main, DocumentContext } from 'next/document';
import { getCookies } from 'cookies-next';

// Elements
import { RobotoFlex } from '../elements/RobotoFlex';
import { Caveat } from '../elements/Caveat';
import { Favicon } from '../elements/Favicon';

// Other
import { NextHeadCustom, NextScriptCustom } from '../init/document';
import { Themes } from '../common/enums/themes';

export default class CustomDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const userAgent = context.req && context.req.headers[ 'user-agent' ];
    const cookies = getCookies(context);
    const theme = cookies.theme === Themes.DARK ? 'dark' : 'light';

    return {
      ...initialProps,
      userAgent,
      theme,
    };
  }

  render() {
    const { theme } = this.props as unknown as { theme: string };

    return (
      <Html lang = 'en' translate='no'>
        <NextHeadCustom />
        <Favicon />
        <RobotoFlex />
        <Caveat />
        <body data-theme = { theme }>
          <Main />
          <NextScript />
          <NextScriptCustom />
        </body>
      </Html>
    );
  }
}
