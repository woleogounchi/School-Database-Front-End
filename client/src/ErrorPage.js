import React from "react";

export default ErrorPage;

function ErrorPage(props) {
  return (
    <div id="root">
      <div>
        <div class="header">
          <div class="bounds">
            <h1 class="header--logo">Courses</h1>
            <nav><a class="signup" href="sign-up.html">Sign Up</a><a class="signin" href="sign-in.html">Sign In</a></nav>
          </div>
        </div>
        <hr />>
        <div class="bounds">
          <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
      </div>
    </div>
  );
}