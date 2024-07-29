import { Community } from "../types/community";

const communities: Community[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  image: "https://picsum.photos/200",
//   `/path/to/image${i + 1}.jpg`,
  title: `Community ${i + 1}`,
  description: `Description for Community ${i + 1}`,
  availability: i % 2 === 0 ? 'Open' : 'Closed',
  members: `${Math.floor(Math.random() * 1000)} members`,
  price: `$${Math.floor(Math.random() * 100)}/month`,
}));

export function getCommunities(page: number, pageSize: number): { communities: Community[], totalCount: number } {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    communities: communities.slice(start, end),
    totalCount: communities.length,
  };
}
