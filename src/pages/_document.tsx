/* eslint-disable @next/next/next-script-for-ga */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === `production`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props, i) =>
            sheet.collectStyles(<App {...props} key={i} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          {isProduction && (
            <>
              <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              ></Script>
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', ${process.env.GA_MEASUREMENT_ID}, { page_path: window.location.pathname, });`,
                }}
              />
            </>
          )}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="theme-color" content="#134153" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="description"
            content="Make event planning a breeze with Easeplan. Find the best service providers, connect with top event planners and vendors, and manage everything in one easy-to-use platform."
          />

          {/*<!-- Google / Search Engine Tags -->*/}
          <meta itemProp="name" content="Ease" />
          <meta
            itemProp="description"
            content="Make event planning a breeze with Easeplan. Find the best service providers, connect with top event planners and vendors, and manage everything in one easy-to-use platform."
          />
          <meta
            itemProp="image"
            content="https://res.cloudinary.com/calebbenjin/image/upload/v1676763721/easeplan_wtwnbu.jpg"
          />

          {/*<!-- Facebook Meta Tags -->*/}
          <meta
            property="og:title"
            content="EasePlan || Effortlessly Plan Your Events"
          />
          <meta
            property="og:description"
            content="Make event planning a breeze with Easeplan. Find the best service providers, connect with top event planners and vendors, and manage everything in one easy-to-use platform."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/calebbenjin/image/upload/v1676763721/easeplan_wtwnbu.jpg"
          />
          <meta property="og:url" content="https://easeplan.io" />
          <meta property="og:type" content="website" />

          {/*<!-- Twitter Meta Tags -->*/}
          <meta
            name="twitter:title"
            content="EasePlan || Effortlessly Plan Your Events"
          />
          <meta
            name="twitter:description"
            content="Make event planning a breeze with Easeplan. Find the best service providers, connect with top event planners and vendors, and manage everything in one easy-to-use platform."
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/calebbenjin/image/upload/v1676763721/easeplan_wtwnbu.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />

          <meta
            property="og:image"
            content="https://res.cloudinary.com/calebbenjin/image/upload/v1676763721/easeplan_wtwnbu.jpg"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}
