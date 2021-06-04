import React from 'react';

import Loader from './componets/Loader';
import useFetch from './hooks/useFetch';
import Story from './componets/Story';
import styles from './styles/app.scss';
import titleLogo from './assets/titleLogo.png';

const App: React.FC = () => {
    const [hackerNews, status] = useFetch();

    if (status == "error") {
        return (
            <div>Something get wrong</div>
        )
    }

    return (
        <>
            <div className={styles.title}>
                <img width={62} height={62} src={titleLogo} />
                <h1>Hacker News</h1>
            </div>
            {status === "fetching" ? <Loader /> :
                <div className={styles.container} >
                    {status === "done" && hackerNews && hackerNews.map((el, index) => (
                        <Story key={index} authorId={el.authorId} score={el.score} karma={el.karma} timeStamp={el.timeStamp} title={el.title} index={index} url={el.url} />
                    ))}
                </div>
            }
        </>
    );
};

export default App;