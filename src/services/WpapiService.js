import WPAPI from 'wpapi';
import conf from './ConfigService';
import * as Sentry from '@sentry/react';

// const PLATFORM = 'PRODUCTION';
// const PLATFORM = 'STAGING';

// Create WPAPI instance and add endpoint to /wp-json
// const wp = new WPAPI({
//   endpoint: config.apiUrl,
//   username: config.userName,
//   password: config.passWord,
// });

export const fetchPosts = async () => {
  console.log('URL', conf);
  // console.log('URL', conf[0].apiUrl);

  // try {
  //   const recentPosts = await wp.posts().perPage(config.perPage).get();
  //   console.log('Recent Posts from WP-API Service:', recentPosts);
  //   return recentPosts;
  // } catch (error) {
  //   console.log('fetchPosts Errors:', error);
  //   Sentry.captureException(error);
  // }
};

// export default wp;
