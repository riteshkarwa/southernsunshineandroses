$(document).ready(function(){
  $('.nav a').on('click', function(){
    $('.navbar-toggle').click() //bootstrap 3.x by Richard
  });

	$('#nav-wrapper').height($("#nav").height());
	$('#nav').affix({
        offset: { top: $('#nav').offset().top }
    });
});
