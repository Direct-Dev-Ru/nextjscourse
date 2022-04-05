import classes from './newsletter-registration.module.css';
import { useRef } from 'react';
import { validator } from '../../helper/validator';
import ErrorAlert from '../ui/Alert/ErrorAlert';

function NewsletterRegistration(props) {
  const { setError } = props;

  const emailInputRef = useRef();

  async function registrationHandler(ev) {
    ev.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    if (!validator('email', enteredEmail)) {
      if (setError) {
        setError((prevState) => ({ ...prevState, errorTitle: 'Bad email - failed client validation', isError: true }));
      }
      return;
    }
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data?.error) {
        if (setError) {
          setError((prevState) => ({ ...prevState, errorTitle: data.message, isError: true }));
        }
        emailInputRef.current.focus();
        return;
      }

      emailInputRef.current.value = '';
    } catch (e) {
      if (setError) {
        setError((prevState) => ({ ...prevState, errorTitle: e.message, isError: true }));
      }
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input ref={emailInputRef} type='email' id='email' placeholder='Enter Your email' aria-label='Your email' />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
