import { useState, useEffect } from "react";

const useFetch = (url) => {
    console.log('url: ', url);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error("could not fetch the data for that resource");
                }
                return res.json();
            })
            .then(data => {
                setLoading(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setLoading(false);
                    setError(err.message)
                }
            })
        return () => abortCont.abort();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;