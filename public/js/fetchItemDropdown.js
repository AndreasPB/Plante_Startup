/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(() => {
  // $('#button').click(() => {
  // fetch('https://plantestartup.azurewebsites.net/api/users')
  fetch('http://localhost:3000/api/items')
    .then((result) => result.json())
    .then((data) => {
      $.each(data, (i, data) => {
        const $option = $('<option>').append(
          $('<option>').text(data.name),
        ).appendTo('#item_dropdown');
      });
    });
});
// });
