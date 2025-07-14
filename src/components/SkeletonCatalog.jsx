import React, { useState, useEffect } from "react";

const SkeletonCatalog = () => {
  // Skeleton components
  const SkeletonCard = () => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="h-48 bg-gray-700 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonInput = ({ className = "" }) => (
    <div
      className={`bg-gray-800 border border-gray-700 rounded p-3 ${className}`}
    >
      <div className="h-5 bg-gray-700 rounded w-full animate-pulse"></div>
    </div>
  );

  const SkeletonSelect = () => (
    <select className="bg-gray-800 border border-gray-700 rounded p-3 opacity-0">
      <option>Loading...</option>
    </select>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Title Skeleton */}
      <div className="h-10 bg-gray-700 rounded w-48 mb-8 animate-pulse"></div>

      {/* Search Bar Skeleton */}
      <div className="mb-8">
        <SkeletonInput />
      </div>

      {/* Filters Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SkeletonSelect />
        <SkeletonSelect />
        <SkeletonSelect />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </div>

      {/* Results Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonCatalog;
