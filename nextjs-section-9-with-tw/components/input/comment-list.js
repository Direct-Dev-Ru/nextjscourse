import classes from './comment-list.module.css';

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>info@direct-dev.ru</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>kuznetcovay@yandex.ru</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
