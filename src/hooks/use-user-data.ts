
'use client';

import { useState, useEffect, useCallback } from 'react';
import { badges } from '@/lib/mock-data';
import type { BadgeInfo } from '@/lib/types';

const POINTS_KEY = 'eco-quest-points';

const getInitialPoints = (): number => {
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
  const [points, setPoints] = useState(getInitialPoints);

  useEffect(() => {
    // Sync state if localStorage changes in another tab
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === POINTS_KEY) {
        setPoints(getInitialPoints());
      }
    };
    
    // Set initial points on client-side mount
    setPoints(getInitialPoints());

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addPoints = useCallback((amount: number) => {
    try {
      const newPoints = getInitialPoints() + amount;
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

  return { points, addPoints, resetPoints, currentBadge: getCurrentBadge(), earnedBadges: getEarnedBadges() };
}
