// pages/api/communities.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getCommunities } from '../lib/mockDatabase';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log('GET request received');
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const { communities, totalCount } = getCommunities(page, pageSize);

    res.status(200).json({
      communities,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}