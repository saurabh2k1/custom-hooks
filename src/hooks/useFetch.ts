import { useEffect, useState } from "react";

interface FetchResult<T> {
    data: T | null;
    error: any;
    loading: boolean;
}

const useFetch = <T,>(url: string, headers?: HeadersInit): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(url, {
                    headers: headers ? new Headers(headers) : undefined,
                });
                if (!result.ok) {
                    throw new Error(result.statusText);
                }
                const json = await result.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, headers]);
    return {
        data,
        error,
        loading,
    };
};

export default useFetch;