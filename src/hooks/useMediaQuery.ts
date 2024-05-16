import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(
        () => window.matchMedia(query).matches);
    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);
    return matches;
};

export default useMediaQuery;