import { useEffect, useState } from "react";

interface FetchResult<T> {
    data: T | null;
    error: any;
    loading: boolean;
}

const useFetch = <T,>(url: string): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(url);
                const json = await result.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);
    return {
        data,
        error,
        loading,
    };
};

export default useFetch;