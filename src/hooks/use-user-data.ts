
'use client';

import { useState, useEffect, useCallback } from 'react';
import { badges } from '@/lib/mock-data';
import type { BadgeInfo } from '@/lib/types';

const POINTS_KEY = 'eco-quest-points';

const getPointsFromStorage = (): number => {
    if (typeof window === 'undefined') return 0;
    try {
        const item = window.localStorage.getItem(POINTS_KEY);
        return item ? parseInt(item, 10) : 0;
    } catch (error) {
        console.error('Error reading points from localStorage', error);
        return 0;
    }
};

export function useUserData() {
  const [points, setPoints] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // On component mount, set the state to be hydrated and get the points.
    // This ensures the server renders 0 initially, and the client also renders 0 initially.
    // Then, the client re-renders with the actual points from localStorage.
    setPoints(getPointsFromStorage());
    setIsHydrated(true);
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === POINTS_KEY) {
        setPoints(getPointsFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addPoints = useCallback((amount: number) => {
    try {
      const newPoints = getPointsFromStorage() + amount;
      window.localStorage.setItem(POINTS_KEY, newPoints.toString());
      setPoints(newPoints);
    } catch (error) {
      console.error('Error saving points to localStorage', error);
    }
  }, []);
  
  const resetPoints = useCallback(() => {
      try {
          window.localStorage.setItem(POINTS_KEY, '0');
          setPoints(0);
      } catch (error) {
          console.error('Error resetting points', error)
      }
  }, []);

  const getCurrentBadge = (): BadgeInfo => {
    // Find the highest badge the user has earned
    let currentBadge = badges[0];
    for (const badge of badges) {
        if (points >= badge.minPoints) {
            currentBadge = badge;
        } else {
            break; // Badges are sorted by minPoints
        }
    }
    return currentBadge;
  };

  const getEarnedBadges = (): BadgeInfo[] => {
      return badges.filter(badge => points >= badge.minPoints);
  }

  // Return 0 points until the component is hydrated on the client
  // to prevent hydration mismatch.
  const displayPoints = isHydrated ? points : 0;

  return { points: displayPoints, addPoints, resetPoints, currentBadge: getCurrentBadge(), earnedBadges: getEarnedBadges() };
}
