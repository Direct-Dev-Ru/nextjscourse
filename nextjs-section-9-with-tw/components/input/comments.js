import { useState, useEffect } from 'react';
import { logga } from '@/helper/loging/logga';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    let isApiSubscribed = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const returnFunction = () => {
      isApiSubscribed = false;
      controller.abort();
    };

    try {
      const res = await fetch(`/api/comment/${eventId}`, {
        signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        logga(`error :${res.status}`);
        return returnFunction;
      }
      setComments(data?.payload?.data ?? []);
    } catch (error) {
      logga(error);
    }
    return returnFunction;
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData, setInfo) {
    try {
      const response = await fetch(`/api/comment/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInfo((prev) => {
          return {
            isShow: true,
            isInvalid: false,
            message: `comment added successfully`,
          };
        });

        const newComments = [...comments, data?.payload?.newComment];
        setComments(newComments);
      } else {
        setInfo((prev) => {
          return {
            isShow: true,
            isInvalid: true,
            message: `error occured while processing new comment post request status:${response.status}`,
          };
        });

        console.log(`error occured while processing new comment post request status:${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
