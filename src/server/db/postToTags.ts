// import prisma then implement the CRUD operations

import prisma from "./client";

// bind a post to a tag
export const postToTag = async (postId: string, tagId: string) => {
  const postToTag = await prisma.postToTags.create({
    data: {
      postId,
      tagId,
    },
  });
  return postToTag;
};

// get all posts that are bound to a tag
export const getAllPostsByTagId = async (tagId: string) => {
  const postToTags = await prisma.postToTags.findMany({
    where: {
      tagId,
    },
  });
  return postToTags;
};

// get all tags that are bound to a post
export const getAllTagsByPostId = async (postId: string) => {
  const postToTags = await prisma.postToTags.findMany({
    where: {
      postId,
    },
  });
  return postToTags;
};

// unbind a post from a tag
export const deletePostToTag = async (postId: string, tagId: string) => {
  const postToTag = await prisma.postToTags.findFirst({
    where: {
      postId,
      tagId,
    },
  });
  if (!postToTag) return null;
  await prisma.postToTags.delete({
    where: {
      id: postToTag.id,
    },
  });
  return postToTag;
};

// count each post that is bound to a tag
export const countPostsByTagId = async (tagId: string) => {
  const count = await prisma.postToTags.count({
    where: {
      tagId,
    },
  });
  return count;
};

// count posts for all tags
export const countPostsByAllTags = async () => {
  const count = await prisma.postToTags.groupBy({
    by: ["tagId"],
    _count: {
      tagId: true,
    },
  });
  return count;
};

// filter by multiple tags (from string array)
export const filterByTags = async (tags: string[]) => {
  // find tagIDs from tag names
  const tagIDs = await prisma.tags.findMany({
    where: {
      name: {
        in: tags,
      },
    },
    select: {
      id: true,
    },
  });
  // find postIDs from tagIDs
  const filteredPosts = await prisma.postToTags.findMany({
    where: {
      tagId: {
        in: tagIDs.map((tag) => tag.id),
      },
    },
  });
  return filteredPosts;
};
