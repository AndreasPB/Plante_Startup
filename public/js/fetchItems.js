/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(() => {
// $('#button').click(() => {
  // fetch('https://plantestartup.azurewebsites.net/api/items')
  fetch('http://localhost:3000/api/items')
    .then((result) => result.json())
    .then((data) => {
      const columnAmount = $('#columns_dropdown').val();
      $('#data_table tbody tr').remove();

      $.each(data, (i, data) => {
        if (i >= columnAmount) return false;

        const $tr = $('<tr>').append(
          $('<td>').text(data.name),
          $('<td>').text(data.description),
          $('<td>').text(data.price),
        ).appendTo('#data_table', 'tbody');
      });
    });
});
// });
