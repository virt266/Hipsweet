$(document).ready(function(){
	$('.bxslider').bxSlider();
	jQuery(function($){
	   $("#phone").mask("+8(999) 999-9999");
	});
//tabs
	(function(){
		$('.tabs-link').on('click', function(e){
		e.preventDefault();

		var
			$this = $(this),
			item = $this.closest('.tabs-item'),
			container = $this.closest('.wrapper'),
			content = container.find('.tabs-content-item'),
			ndx = item.index(),
			reqItem = content.eq(ndx),
			activeItem = content.filter('.active');

			item.addClass('active')
				.siblings()
				.removeClass('active');

			content.eq(ndx)
				.addClass('active')
				.siblings()
				.removeClass('active');

				activeItem.fadeOut(300, function(){
					reqItem.fadeIm(300, function(){
						$(this).addClass('active')
							.siblings()
							.removeClass('active');
					});
				});
		});
	}());

	(function(){

	});
});