/* eslint-disable @next/next/no-document-import-in-page */
// Core
import { Head } from 'next/document';

export class NextHeadCustom extends Head {
  getPreloadMainLinks() {
    return [];
  }
}
