const form = document.querySelector('.login_form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const identifier = document.querySelector('#identifier').value;
  const password = document.querySelector('#password').value;

  const request_body = {
    identifier: identifier,
    password: password,
  };

  fetch('https://01.kood.tech/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${identifier}:${password}`)}`,
    },
    body: JSON.stringify(request_body),
  })

    .then((response) => {
      if (response.ok) {

        return response.json();
      } else {
        // Login failed
        throw new Error('Invalid credentials');
      }
    })
    .then((data) => {
      const jwt = data;
      localStorage.setItem('jwt', jwt);
      console.log(jwt);
      window.location.href = "profile.html";

    })

    .catch((error) => {
      console.error('Login failed:', error);
      // Display an error message on the login form
      const errorElement = document.querySelector('#login_error');
      errorElement.style.display = 'block';
      setTimeout(() => {
        errorElement.style.display = 'none';
      }
        , 5000);
    });

  const jwt = localStorage.getItem('jwt');

});
