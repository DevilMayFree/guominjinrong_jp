/*$j(document).ready(function() {
  // UL devider starts
  $j(".two-box-right-content > ul").each(function() {
    breakList(2, $j(this));
    //$j(this).next().find('ul').addClass('divided-ul');
    $j(this).remove();
  });
  function breakList(numOfLists, list) {
    var listLength = list.find(".two-box-right-content li").size();
    var numInRow = Math.ceil(listLength / numOfLists);
    for (var i = 0; i < numOfLists; i++) {
      var listItems = list.find(".two-box-right-content li").slice(0, numInRow);
      var newList = $j("<ul class='ul-two-box-" + i + "'/>").append(listItems);
      $j(list).parent().append(newList);
    }
  }
  // UL devider ends
});*/

$j(document).ready(function ($j) {
//$j(".two-box-right-content > ul > li > ul").each(function() {

	//$j(this).parent().parent().addClass('level2');
    $j('.two-box-right-content > ul > li').addClass('level2');
    //alert('test');
//});
  // UL devider starts
  $j(".two-box-right-content > ul").each(function() {
    breakList(2, $j(this));
    $j(this).remove();
  });
  function breakList(numOfLists, list)
  {
    var listLength = list.find("li.level2").size();
    var numInRow = Math.ceil(listLength / numOfLists);
    for (var i = 0; i < numOfLists; i++) {
      var listItems = list.find("li.level2").slice(0, numInRow);
      var newList = $j("<ul class='two-box-ul-" + i + "'/>").append(listItems);
      $j(list).parent().append(newList);
    }
  }
});