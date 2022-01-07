import React from 'react';

import styles from './PostsControl.module.css';

const postsControl = (props) => (
    <div className={styles.PostsControl} onClick={props.clicked}>
        {props.label}
    </div>
);

export default postsControl;