import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};


// POST '/api/listings/'
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).send("401 - Not Authorized");
    return;
  }

  // POST '/api/listings/'
  if (req.method === "POST") {
    return
  }
}
