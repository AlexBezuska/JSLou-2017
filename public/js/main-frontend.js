$( document ).ready(function() {
  var queryStringId = getParameterByName("id");
  if (queryStringId){
    var $currentItem = $("tr[data-id='"+ queryStringId +"']");

    // Highlight selected row in table
    $currentItem.addClass("success");

    // Scroll to selected row in table
    scrollToTop ($("#events-table-scoll-box"), $currentItem);
  }


$('.clear-form-btn').click(function(e){
  if (!confirm('This will delete any unsaved changes to the current event.')) e.preventDefault();
});

$('.delete-event-btn').click(function(e){
  var dateStart = $(this).attr('data-dateStart');
  if (!confirm('This will delete any unsaved changes to the event scheduled on ' + dateStart )) e.preventDefault();
});


}); // doc ready



function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results == null){
    return "";
  } else{
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

function scrollToTop (container, element) {
  container.animate({
    scrollTop: element.offset().top - container.offset().top + container.scrollTop()
  })
}

