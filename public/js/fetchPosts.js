/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(() => {
  $('#button').click(() => {
    fetch('https://plantestartup.azurewebsites.net/api/posts')
    //fetch('http://localhost:8080/api/posts')
      .then((result) => result.json())
      .then((data) => {
        const columnAmount = $('#columns_dropdown').val();
        $('#data_table tbody tr').remove();

        $.each(data, (i, data) => {
          if (i >= columnAmount) return false;

          const $tr = $('<tr>').append(
            $('<td>').text(data.title),
            $('<td>').text(data.description),
          ).appendTo('#data_table', 'tbody');
        });
      });
  });
});
