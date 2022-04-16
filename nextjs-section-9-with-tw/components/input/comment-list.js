import { useState } from 'react';
import { logga } from '@/helper/loging/logga';

import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item.id}>
          <p>{item.text}</p>
          <div>
            On {item.id} Posted By {item.name} (<address>{item.email}</address>)
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
