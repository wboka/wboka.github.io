var crosshairs = function (tables){
	$(tables + ' td').bind('mouseover mouseleave', function (e) {
		var index = this.cellIndex;
	
		if (e.type == "mouseover") {
			$(this).parent().addClass('highlight');
			$(this).parents('table').find('tr').each(function() {
				$(this).find('td').eq(index).addClass('highlight');
			});
		} else {
			$(this).parent().removeClass('highlight');
			$(this).parents('table').find('tr').each(function() {
				$(this).find('td').eq(index).removeClass('highlight');
			});
		}
	});
}

crosshairs('table');