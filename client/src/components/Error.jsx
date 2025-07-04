import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div>
      <h2>Error: Something went wrong or the URL doesn't exist.</h2>
      <Link to="/">Go back</Link>
    </div>
  );
}

export default Error;
