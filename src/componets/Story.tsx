import React from 'react';
import { HackerStories, images } from '../definitions'
import styles from '../styles/story.scss';

interface OwnProps {
    index: number;
}

type Props = HackerStories & OwnProps

const dateFormat = (unixData: number) => {
    const date = new Date(unixData * 1000);
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    return `${date.getFullYear()} ${date.getHours()}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}

const Story: React.FC<Props> = ({ authorId, karma, timeStamp, title, score, url, index }) => (
    <div className={styles.storyContainer}>
        <div className={styles.imgContainer}><img src={images[index]} /></div>
        <div className={styles.storyDetails}>
            <div className={styles.title}>{title}</div>
            <div>{dateFormat(timeStamp)}</div>
            <div><button onClick={() => window.open(url)}>Read the story</button></div>
        </div>
        <div className={styles.authorDetails}>
            <div className={styles.score}>{score}</div>
            <div>Author: {authorId}</div>
            <div>Author karma: {karma}</div>
        </div>
    </div>
)


export default Story;