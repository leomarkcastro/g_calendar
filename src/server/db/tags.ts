// import prisma then implement the CRUD operations

import prisma from "./client";

// create a new tag
export const createTag = async (name: string) => {
  const tag = await prisma.tags.create({
    data: {
      name,
    },
  });
  return tag;
};

// get all tags
export const getAllTags = async () => {
  const tags = await prisma.tags.findMany();
  return tags;
};

// get a tag by id
export const getTagById = async (id: string) => {
  const tag = await prisma.tags.findUnique({
    where: {
      id,
    },
  });
  return tag;
};

export const getTagByName = async (name: string) => {
  const tag = await prisma.tags.findUnique({
    where: {
      name,
    },
  });
  return tag;
};

// update a tag by id
export const updateTagById = async (id: string, name: string) => {
  const tag = await prisma.tags.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return tag;
};

// delete a tag by id
export const deleteTagById = async (id: string) => {
  const tag = await prisma.tags.delete({
    where: {
      id,
    },
  });
  return tag;
};
