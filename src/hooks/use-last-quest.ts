
'use client';

import { useState, useEffect } from 'react';

const LAST_QUEST_URL_KEY = 'eco-quest-last-url';

export function useLastQuest(currentPath?: string) {
  const [lastQuestUrl, setLastQuestUrl] = useState('/lessons');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This effect runs on the client after hydration
    const storedUrl = localStorage.getItem(LAST_QUEST_URL_KEY);
    if (storedUrl) {
      setLastQuestUrl(storedUrl);
    }
    setIsHydrated(true);

    // If a currentPath is provided, it means we are on a quest page,
    // so we should update the last quest URL.
    if (currentPath) {
      localStorage.setItem(LAST_QUEST_URL_KEY, currentPath);
      // Also update the state in case this hook is used to display the current path
      if(storedUrl !== currentPath) {
          setLastQuestUrl(currentPath);
      }
    }
  }, [currentPath]);
  
  // Return a default value until the component is hydrated
  // to prevent hydration mismatch.
  const displayUrl = isHydrated ? lastQuestUrl : '/lessons';

  return { lastQuestUrl: displayUrl };
}
