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

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

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
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <link rel="shortcut icon" href="/easeplanlogo.png"></link>
          <link rel="apple-touch-icon" href="/easeplanlogo.png"></link>
          <link
            rel="apple-touch-icon-precomposed"
            href="/easeplanlogo.png"
          ></link>
          <meta name="next-head-count" content="24"></meta>
          <meta name="theme-color" content="#134153" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="description"
            content="Make event planning easy with Easeplan. Find & hire the best vendors, event service providers, connect with top event planners in Nigeria. Decorators, Photographers, Bakers, Caterers, Ushering, Event planners, Make-up artists, DJs, MCs, Hair stylist, in Nigeria"
          />

          {/*<!-- Google / Search Engine Tags -->*/}
          <link rel="canonical" href=""></link>
          <meta itemProp="name" content="easeplan" />
          <meta
            itemProp="description"
            content="Search, Find & Hire Event Vendors In Nigeria"
          />
          <meta
            name="keywords"
            content="event vendors in nigeria, event vendors in Lagos, event vendors in Port Harcourt, event vendors in Lagos, photographers in nigeria, wedding planners in nigeria, photographers in port harcourt, photographers in Lagos, djs in Lagos, djs in port harcourt, caterers in hort harcourt, caterers in lagos, decorators in port harcourt, decorators in lagos, vendors in port harcourt, vendors in nigeria,"
          ></meta>
          <meta
            itemProp="image"
            content="https://res.cloudinary.com/dw8my5zef/image/upload/v1702409519/p5k8zhv3fqdyeej9i3eh.png"
          />

          {/*<!-- Facebook Meta Tags -->*/}
          <meta property="og:site_name" content="easeplan.io"></meta>
          <meta
            property="og:title"
            content="Easeplan || Search, Find & Hire Verified Event Vendors In Nigeria"
          />
          <meta
            property="og:description"
            content="Make event planning easy with Easeplan. Find & hire the best vendors, event service providers, connect with top event planners in Nigeria. Decorators, Photographers, Bakers, Caterers, Ushering, Event planners, Make-up artists, DJs, MCs, Hair stylist, in Nigeria"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dw8my5zef/image/upload/v1702409519/p5k8zhv3fqdyeej9i3eh.png"
          />
          <meta property="og:url" content="https://easeplan.io" />
          <meta property="og:type" content="website" />
          {/*<!-- Twitter Meta Tags -->*/}
          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:site" content="@easeplan_team"></meta>
          <meta
            name="twitter:title"
            content="Easeplan || Search, Find & Hire Verified Event Vendors In Nigeria"
          />
          <meta
            name="twitter:description"
            content="Make event planning easy with Easeplan. Find & hire the best vendors, event service providers, connect with top event planners in Nigeria. Decorators, Photographers, Bakers, Caterers, Ushering, Event planners, Make-up artists, DJs, MCs, Hair stylist, in Nigeria"
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/dw8my5zef/image/upload/v1702409519/p5k8zhv3fqdyeej9i3eh.png"
          />
          <meta name="twitter:card" content="summary_large_image" />

          <meta
            property="og:image"
            content="https://res.cloudinary.com/dw8my5zef/image/upload/v1702409519/p5k8zhv3fqdyeej9i3eh.png"
          ></meta>
          <script
            src="//code.tidio.co/21uy26badngx3tbzmpasj43ughruymu0.js"
            async
          ></script>
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
