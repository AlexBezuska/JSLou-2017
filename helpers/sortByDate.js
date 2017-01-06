var comparisons = {
  ascending : function(a,b){
    return Date.parse(a.date) - Date.parse(b.date);
  },
  descending : function(a,b){
    return Date.parse(b.date) - Date.parse(a.date);
  }
}

module.exports = function(events, options){
  var direction = options.hash["direction"] || "ascending";
  var sortedEvents = events.slice(0).sort(comparisons[direction]);
  return options.fn(sortedEvents);
}
