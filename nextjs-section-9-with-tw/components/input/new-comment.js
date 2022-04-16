import { useRef, useState } from 'react';
import { validator } from '../../helper/validator';
import classes from './new-comment.module.css';
import { logga } from '@/helper/loging/logga';

function NewComment(props) {
  const [info, setInfo] = useState({
    isShow: false,
    isInvalid: false,
    message: 'Please enter valid values into fields',
  });

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  //   Handler press button Submit
  const sendCommentHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    // logga(validator('email', enteredEmail));
    // logga(validator('name', enteredName));
    // logga(validator('custom', enteredComment, /(<([^>]+)>)/gi));
    // logga(validator('empty', enteredComment));
    if (
      !(
        validator('email', enteredEmail) &&
        validator('name', enteredName) &&
        !validator('custom', enteredComment, /(<([^>]+)>)/gi) &&
        validator('empty', enteredComment)
      )
    ) {
      setInfo((prev) => ({ isShow: true, isInvalid: true, message: 'Please enter valid values into fields' }));
      return;
    }
    setInfo((prev) => ({ isShow: false, isInvalid: false, message: '' }));

    props.onAddComment(
      {
        email: enteredEmail,
        name: enteredName,
        text: enteredComment,
      },
      setInfo
    );
  };

  const { isShow, isInvalid, message } = info;
  //   logga(isShow, isInvalid, message);
  return (
    <form className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
      </div>
      {isShow && <p className={isInvalid ? 'text-red-600' : 'text-yellow-300'}>{message}</p>}
      <button className={classes.button} onClick={sendCommentHandler}>
        Submit
      </button>
    </form>
  );
}

export default NewComment;
