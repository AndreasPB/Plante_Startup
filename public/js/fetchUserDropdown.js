/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(() => {
  // fetch('https://plantestartup.azurewebsites.net/api/users')
  fetch('http://localhost:3000/api/users')
    .then((result) => result.json())
    .then((data) => {
      $.each(data, (i, data) => {
        const $option = $('<option>').append(
          $('<option>').text(data.username),
        ).appendTo('#user_dropdown');
      });
    });
});