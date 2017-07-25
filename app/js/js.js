$(document).ready(function(){
	$('.bxslider').bxSlider();
	$('.tabs-link').on('click', function(e){
		e.preventDefault();

		var
			$this = $(this),
			item = $this.closest('.tabs-item'),
			container = $this.closest('.wrapper'),
			content = container.find('.tabs-content-item'),
			ndx = item.index(),
			reqItem = content.eq(ndx),
			activeItem = content.filter('.tabs-item-active');

			item.addClass('tabs-item-active')
				.siblings()
				.removeClass('tabs-item-active');

			content.eq(ndx)
				.addClass('content-active')
				.siblings()
				.removeClass('content-active');


	});
});

jQuery(function($){
   $("#phone").mask("+8(999) 999-9999");
});