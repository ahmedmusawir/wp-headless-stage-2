import WPAPI from 'wpapi';
import config from './ConfigService';
import * as Sentry from '@sentry/react';

// Create WPAPI instance and add endpoint to /wp-json
const wp = new WPAPI({
  endpoint: config.apiUrl,
  username: config.userName,
  password: config.passWord,
});

export const fetchPosts = async () => {
  // console.log('Config Service:', config);
  try {
    const recentPosts = await wp.posts().perPage(config.perPage).get();
    console.log('Recent Posts from HTTP Service:', recentPosts);
    return recentPosts;
  } catch (error) {
    console.log('fetchPosts Errors:', error);
    Sentry.captureException(error);
  }
};

export const fetchSinglePost = async (postId) => {
  try {
    // Fetch Single Post
    const singlePost = await wp.posts().id(postId).get();
    console.log('Single Post HTTP Service: ', singlePost);
    return singlePost;
  } catch (e) {
    // print error
    console.log(e);
    return [];
  }
};

export const insertPost = async (data) => {
  let uploadedImage = '';
  let newPost = '';

  try {
    // UPLOADING IMAGE
    uploadedImage = await wp.media().file(data.imageUrl).create({
      title: 'Image Loaded by React HeadLess',
      alt_text: 'an image of something awesome',
      caption: 'This is the caption text',
      description: 'More explanatory information',
    });
  } catch (error) {
    console.log('IMAGE UPLOAD ERROR: ', error);
  }

  console.log('Uploaded Image ID:', uploadedImage.id);

  try {
    // CREATING NEW POST W FEATURED IMAGE
    newPost = await wp.posts().create({
      title: data.title,
      content: data.content,
      featured_media: uploadedImage.id,
      categories: [157, 30],
      tags: [374, 375],
      status: 'publish',
    });
  } catch (error) {
    console.log('POST CREATION ERROR: ', error);
  }

  console.log('Newly Created Post: ', newPost);
};

export const updatePost = async (
  imageUrl,
  setImageUrl,
  postId,
  title,
  content
) => {
  let uploadedImage = '';
  let updatedPost = '';

  // console.log('Image URL:', imageUrl);

  if (imageUrl) {
    try {
      // UPLOADING IMAGE
      uploadedImage = await wp.media().file(imageUrl).create({
        title: 'Image Loaded by React HeadLess',
        alt_text: 'an image of something awesome',
        caption: 'This is the caption text',
        description: 'More explanatory information',
      });

      console.log('Uploaded Image ID:', uploadedImage.id);
    } catch (error) {
      console.log('IMAGE UPLOAD ERROR: ', error);
    }
  } else {
    setImageUrl(null);
  }

  try {
    // CREATING NEW POST W FEATURED IMAGE
    updatedPost = await wp
      .posts()
      .id(postId)
      .update({
        title: title,
        content: content,
        featured_media: uploadedImage.id,
        categories: [157, 30],
        tags: [374, 375],
        status: 'publish',
      });
  } catch (error) {
    console.log('POST CREATION ERROR: ', error);
  }

  // console.log('Newly Created Post: ', updatedPost);
  return updatedPost;
};

export const deletePost = async (id, posts, setPosts) => {
  await wp
    .posts()
    .id(id)
    .delete()
    .then((res) => {
      console.log(res);
      setPosts(posts.filter((post) => post.id !== res.id));
    });
};

export const conf = config;

export default wp;
