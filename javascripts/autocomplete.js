$j(document).ready(function () {
	//main search textbox
	if($j("#searchTextbox").length > 0)
	{
		$j("#searchTextbox").autocomplete({
			source: function (request, response) {

				$j.ajax({
					url: "/Investis/AdvancedSearch/PredictiveSearch.aspx",
					data: {
						ps_lang: 'en',
						PS_HOSTNAME: autoCompleteDomain,
						PS_SEARCHTERM: encodeURIComponent(request.term),
						PS_MAXSUGGESTIONCOUNT: 7
					},
					async: true,
					success: function (data) {


						response(data);
					},
					error: function (result) {
						//alert("Error loading the data" + result.responseText);
					}
				});
			},
			minLength: 1,
			select: function (event, ui) {
				$j("#searchTextbox").val(ui.item.value);
				$j("#searchButton").trigger("click");
			}
		}).data("ui-autocomplete")._renderItem = function (ul, item) {
			return $j("<li class='ui-corner-all'>")
				.append("<a> <span style='float:left;'>" + item.label + "</span><span style='float:right;'>(" + item.count + ")</span></a>").appendTo(ul);
		};
		
		
	}
	
	
	// Search result page textbox
	if($j("#SearchTextboxRP").length > 0)
		{
			 $j("#SearchTextboxRP").autocomplete({
				source: function (request, response) {
					$j.ajax({
						url: "/Investis/AdvancedSearch/PredictiveSearch.aspx",
						data: {
							ps_lang: 'en',
							PS_HOSTNAME: autoCompleteDomain,
							PS_SEARCHTERM: encodeURIComponent(request.term),
							PS_MAXSUGGESTIONCOUNT: 7
						},
						async: true,
						success: function (data) {
							response(data);
						},
						error: function (result) {
							//alert("Error loading the data" + result.responseText);
						}
					});
				},
				minLength: 1,
				select: function (event, ui) {
					$j("#SearchTextboxRP").val(ui.item.value);
					$j("#SearchbuttonRP").trigger("click");
				}
			}).data("ui-autocomplete")._renderItem = function (ul, item) {
				return $j("<li class='ui-corner-all'>")
					.append("<a> <span style='float:left;'>" + item.label + "</span><span style='float:right;'>(" + item.count + ")</span></a>").appendTo(ul);
			};
		}
});