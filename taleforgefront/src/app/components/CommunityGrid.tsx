'use client';

import React, { useEffect, useState } from 'react';
import CommunityCard from './CommunityCard';
import SearchBar from './SearchBar';
import { fetchCommunities } from '../services/communityService';
import { Community } from '../types/community';

const CommunityGrid: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 9; // Adjust as needed

  useEffect(() => {
    const loadCommunities = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCommunities(currentPage, pageSize);
        setCommunities(data.communities);
        setFilteredCommunities(data.communities);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCommunities();
  }, [currentPage]);

  useEffect(() => {
    const filtered = communities.filter(community =>
      community.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommunities(filtered);
  }, [searchTerm, communities]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-20"> {/* Adjusted padding */}
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {filteredCommunities.map((community) => (
          <CommunityCard key={community.id} {...community} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunityGrid;
