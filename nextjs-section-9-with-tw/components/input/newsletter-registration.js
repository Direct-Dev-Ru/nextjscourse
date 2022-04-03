import classes from './newsletter-registration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  async function registrationHandler(ev) {
    ev.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ enteredEmail }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input res={emailInputRef} type='email' id='email' placeholder='Your email' aria-label='Your email' />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
