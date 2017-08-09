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
			duration = 300;

			item.addClass('active')
				.siblings()
				.removeClass('active');

			content.eq(ndx)
				.addClass('active')
				.siblings()
				.removeClass('active');

				activeItem.fadeOut(duration, function(){
					reqItem.fadeIn(duration, function(){
						$(this).addClass('active')
							.siblings()
							.removeClass('active');
					});
				});
		});
	}());

	(function(){

		var flag = true;

		$('.acco-trigger').on('click', function(e){
			e.preventDefault();

			var
				$this = $(this),
				container = $this.closest('.acco'),
				item = $this.closest('.acco-item'),
				correntContent = item.find('.acco-content'),
				duration = 300;

			if (flag){
				flag = false;
				if (!item.hasClass('active')){
				item
					.addClass('active')
					.siblings()
					.removeClass('active')
					.find('.acco-content')
					.slideUp(duration);

				correntContent.slideDown(duration, function(){
					flag = true
				});

			} else {
				
				item.removeClass('active');
				correntContent.slideUp();
					flag = true;
			}
			}
		});
	}());
});