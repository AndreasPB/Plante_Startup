/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(() => {
  $('#user_dropdown').change(() => {
    const username = $('#user_dropdown').val();

    fetch('http://localhost:3000/api/users')
      .then((result) => result.json())
      .then((data) => {
        $.each(data, (i, data) => {
          if (username === data.username) {
            $('#username').val(data.username);
            $('#email').val(data.email);
            $('#password').val(data.password);
            $('#form').attr('action', `api/user/register/${data._id}`);
            console.log(data._id);
          }
        });
      });
  });
});
