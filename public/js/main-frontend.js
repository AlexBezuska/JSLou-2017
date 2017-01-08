$( document ).ready(function() {

  $('.clear-form-btn').click(function(e){
    if (!confirm('This will delete any unsaved changes to the current item.')) e.preventDefault();
  });

  $('.delete-item-btn').click(function(e){
    if (!confirm('This will delete the selected item, this cannot be undone.' )) e.preventDefault();
  });


}); // doc ready