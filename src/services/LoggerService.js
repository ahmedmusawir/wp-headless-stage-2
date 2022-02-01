import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const Logger = () => {
  return Sentry.init({
    dsn: 'https://cc581e2cb5d24359b839d28482c59bc1@o1109735.ingest.sentry.io/6138286',
    integrations: [new Integrations.BrowserTracing()],
    // maxBreadcrumbs: 50,
    // debug: false,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};

export default Logger;
