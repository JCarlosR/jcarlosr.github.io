jQuery(function () {
	jQuery('#skills').slick({ 
		dots: false,
		centerMode: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2500,
		arrows: false,
		inifinite: true
	});
	$('img.skill').css('opacity', 1);
});
