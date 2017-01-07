$( document ).ready(function() {
  var $currentItem = $("tr[data-id='"+ getParameterByName("id") +"']");
  var $container = $("#events-table-scoll-box");

  // Highlight selected row in table
  $currentItem.addClass("success");

  // Scroll to selected row in table
  scrollToTop ($container, $currentItem);
});

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