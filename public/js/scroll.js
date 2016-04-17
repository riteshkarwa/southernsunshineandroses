$(document).ready(function(){
  $('.nav a').on('click', function(){
    $('.navbar-toggle').click(function(e){
        e.preventDefault();
    }); //bootstrap 3.x by Richard
  });

	$('#nav-wrapper').height($("#nav").height());
	$('#nav').affix({
        offset: { top: $('#nav').offset().top }
    });
});
