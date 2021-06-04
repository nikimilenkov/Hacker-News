import { useEffect, useState } from "react";
import 'regenerator-runtime/runtime'

import { HackerStories } from '../definitions'

const useFetch = () => {
    const [status, setStatus] = useState("idle");
    const [hackerNews, setHackerNews] = useState<HackerStories[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            setStatus("fetching");
            const response = await fetch(
                "https://hacker-news.firebaseio.com/v0/topstories.json"
            );
            try {
                const itemIds = await response.json();
                const randomIds = itemIds.sort(() => .5 - Math.random()).slice(0, 10)
                // I can use lodash but it is heavy package only for one calculation
                // const randomIds = sampleSize(itemIds, 10);

                Promise.all(randomIds.map(async (id: number) => {
                    const itemsrResult = await fetch(
                        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                    );
                    const { by: authorId, score, url, title, time: timeStamp } = await itemsrResult.json();

                    const authorResult = await fetch(`https://hacker-news.firebaseio.com/v0/user/${authorId}.json `);
                    const { karma } = await authorResult.json();

                    return { authorId, karma, timeStamp, title, score, url }

                })).then((result) => {
                    try {
                        result.sort((el1, el2) => {
                            if (el1.score < el2.score) {
                                return -1
                            }
                            if (el1.score > el2.score) {
                                return 1;
                            }

                            return 0;
                        })
                        setStatus("done");
                        
                        return setHackerNews(result)
                    } catch {
                        setStatus("error");
                    }
                })
            } catch (error) {
                setStatus("error");
            }
        };
        fetchImages();
    }, []);

    return [hackerNews, status] as const;
};

export default useFetch;