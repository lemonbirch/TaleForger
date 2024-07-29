import { Community } from '../types/community';
import { getCommunities } from '../lib/mockDatabase';

interface FetchCommunitiesResponse {
  communities: Community[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export async function fetchCommunities(page: number, pageSize: number): Promise<FetchCommunitiesResponse> {
  console.log(`Fetching communities from page ${page} with page size ${pageSize}`);

  // Simulating a network request by calling the mock database function
  const result = getCommunities(page, pageSize);

  // Converting result to the expected response format
  return {
    communities: result.communities,
    totalCount: result.totalCount,
    currentPage: page,
    totalPages: Math.ceil(result.totalCount / pageSize),
  };
}
