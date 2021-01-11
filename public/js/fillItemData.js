/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(() => {
  $('#item_dropdown').change(() => {
    const name = $('#item_dropdown').val();

    fetch('http://localhost:3000/api/items')
      .then((result) => result.json())
      .then((data) => {
        $.each(data, (i, data) => {
          if (name === data.name) {
            $('#name').val(data.name);
            $('#price').val(data.price);
            $('#type').val(data.type);
            $('#description').val(data.description);
            $('#form').attr('action', `api/items/${data._id}`);
            console.log(data._id);
          }
        });
      });
  });
});
