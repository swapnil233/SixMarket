import prisma from "@/utils/prisma";
import { Category, Listing } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface IGetCategoryAndAssociatedListingsResponse {
  category: Category;
  allListingsInCategory: Array<Listing>;
}

async function getCategory(slug: string) {
  return await prisma.category.findUnique({
    where: {
      slug: slug,
    },
  });
}

async function getListingsByCategoryId(categoryId: string) {
  return await prisma.listing.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      images: true,
      tags: true,
      favorites: true,
    },
  });
}

// '/api/categories/'
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const slug: string = req.query.slug as string;

    // Input validation
    if (!slug) {
      return res.status(400).send("Missing 'slug' parameter in the request.");
    }

    try {
      const category = await getCategory(slug);

      if (!category) {
        return res.status(400).send(`Category "${slug}" doesn't exist.`);
      }

      const allListingsInCategory = await getListingsByCategoryId(category.id);

      const response: IGetCategoryAndAssociatedListingsResponse = {
        category,
        allListingsInCategory,
      };

      return res.status(200).json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "An error occurred.", error: error.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method not allowed. Use 'GET' instead.");
  }
}
