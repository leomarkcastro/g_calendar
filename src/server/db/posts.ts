// import prisma then implement the CRUD operations

import prisma from "./client";

// create a new post
export const createPost = async (title: string, content: string) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return post;
};

// get all posts
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

// get a post by id
export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};

// update a post by id
export const updatePostById = async (
  id: string,
  title: string,
  content: string
) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
  return post;
};

// delete a post by id
export const deletePostById = async (id: string) => {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return post;
};
