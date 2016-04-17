$(document).ready(function(){
  $('.navbar-nav').on('click', 'li a', function() {
    $('.navbar-collapse').collapse('hide');
  });

	$('#nav-wrapper').height($("#nav").height());
	$('#nav').affix({
        offset: { top: $('#nav').offset().top }
    });
});
