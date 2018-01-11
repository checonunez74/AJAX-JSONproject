
$(document).ready(function() {
	
		$.getJSON("email_list.js", 
			{format: "JSON"}).done(function(data){
			
			console.log(data);
			for (key in data) {
				emailID = "#" + data[key].id;
				
				$(".email-header")
				.eq(key).attr("id", data[key].id);
				
				f_el = $(emailID).find('td');
				
				f_el.eq(0).attr("id", "sender" )
				.html(data[key].sender);
				
				f_el.eq(1).attr("id", "subject")
				.html(data[key].subject);
				
				f_el.eq(2).attr("id", "datetime")
				.html(data[key].datetime);
			}
		});

	// show/hide emails when click on headers
	$("tr.email-header").click(function(){
		//this is adding the id 
		id = "#body " + $(this).attr("id");
		//creates the name for each file
		fileID = $(this).attr("id") + ".js";
			//console.log(id);
		//////////////////////////////////////
		//make the AJAX call here	
			$.ajax({
				url: fileID, 
				dataType: "JSON",
				success: function(data) {
					
					console.log(data.sender);
					console.log(data.recipient);
					console.log(data.body);
					//I need to replace the contents in the HTML file with 
					//my JASON file contents.
					//$(this).closest(".email-body").append(data.recipient);
					$(".email-body").first("p").replaceWith("To: " + data.recipient);
					$(".email-body").next("p").replaceWith(data.body);
						//fElement.eq(0).html(data.recipient);
						//fElement.eq(1).html(data.body);					
					
				}}).fail(function() {
						console.log(id + " - HAS AN ERROR!");				
				});
		$(this).next().eq(0).toggle();	
		
	});

	// hide email on click
	$("tr.email-body").click(function(){
		$(this).hide();
	});
	
});
