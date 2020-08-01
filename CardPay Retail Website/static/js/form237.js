$(document).ready(function() {
	
	$('form').on('submit', function(event) {	
	$('.ajaxProgress').show();	
	$('#successAlert').hide();
	$('#errorAlert').hide();
		$.ajax({
			data : {
				name : $('#jaffa').val(),
				
			},
			type : 'POST',
			url : '/processing',
			
		})
		.done(function(data) {
			$('.ajaxProgress').hide();
			if (data.namered) {

				$('#errorAlert').text(data.namered).show();
				$('#successAlert').hide();
				
			}
			else
			{
				if(data.error){
					$('#successAlert').hide();
					$('#errorAlert').hide();
				}
				else{
					$('#successAlert').text(data.name).show();
					$('#errorAlert').hide();
				}
				
			}
			
				
			

		});

		event.preventDefault();

	});

});
$(document).ready(function() {
	$(document).ready(function() {
		$('#main-nav li a').click(function(e) {
			
			var targetHref = $(this).attr('href');
			
		  $('html, body').animate({
			  scrollTop: $(targetHref).offset().top
		  }, 1000);
		  
		  e.preventDefault();
		});
	  });
	});


