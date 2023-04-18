import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/utils/prisma';
import { ItemForSale } from '@prisma/client';
const logger = require('@/utils/logger'); // Import the logger middleware using the 'require' syntax

async function getTenRecentAds(): Promise<ItemForSale[] | null> {
    try {
        const listings = await prisma.itemForSale.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });
        return listings;
    } catch (error: any) {
        throw new Error('Failed to fetch data', error);
    }
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await logger(req, res, async () => {
        try {
            const recentlyPostedAds = await getTenRecentAds();

            if (!recentlyPostedAds || recentlyPostedAds.length === 0) {
                res.status(404).send({ error: 'No listings found' });
                return;
            }

            // If the request method is HEAD, only send the status
            if (req.method === 'HEAD') {
                res.status(200).end();
                return;
            }

            // If the request method is not HEAD, send the user data
            res.status(200).json(recentlyPostedAds);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    });
}