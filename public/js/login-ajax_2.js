jQuery(document).ready(function(){
  
  jQuery("#login-email").on('focus', function(){
       jQuery('.alert').hide();
  });

  jQuery("#login-password").on('focus', function(){
       jQuery('.alert').hide();   
  });

  jQuery("#recover-link").on('click', function(){
    jQuery("#model-request-form").hide().animate({'right': '200px'}, 1000, 'linear');
    jQuery("#mem_signup").hide().animate({'right': '200px'}, 1000, 'linear');
    jQuery("#recover-form").show().animate({'left': '200px'}, 1000, 'linear');

  });

  jQuery("#sign-in-link").on('click', function(){
    jQuery("#model-request-form").show().animate({'left': '200px'}, 1000, 'linear');
    jQuery("#recover-form").hide().animate({'right': '200px'}, 1000, 'linear');
    jQuery("#mem_signup").hide().animate({'right': '200px'}, 1000, 'linear');
  });

  jQuery("#login-recocer-link").on('click', function(){
    jQuery("#model-request-form").show().animate({'left': '200px'}, 1000, 'linear');
    jQuery("#recover-form").hide().animate({'right': '200px'}, 1000, 'linear');
    jQuery("#mem_signup").hide().animate({'right': '200px'}, 1000, 'linear');
  });

  jQuery("#signup-link").on('click', function(){
    jQuery("#model-request-form").hide().animate({'right': '200px'}, 1000, 'linear');
    jQuery("#recover-form").hide().animate({'right': '200px'}, 1000, 'linear');
    jQuery("#mem_signup").show().animate({'left': '200px'}, 1000, 'linear');

  });

    jQuery("#model-request-form").on("submit", function(e){//event handler for login form
        e.preventDefault();
  
        var action = jQuery(this).attr("action");
        var loginId = jQuery("#login-email").val();
        var pass = jQuery("#login-password").val();
        
        var urlPath = jQuery("#login-url-path").val();
        
        if(jQuery.trim(jQuery("#login-email").val()) == "" || jQuery.trim(jQuery("#login-password").val()) == ""){
          jQuery(".login-alert-error").show();
            jQuery(".login-alert-error").html(" Enter your email address and password!");

        }else{
        
            jQuery.ajax({
            headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
             },
            type: "POST",
            dataType: "json",
            url: action,
            data: {"loginId": loginId, "pass": pass},
            beforeSend:function(){
              jQuery(".login-alert-error").hide();
              jQuery('.login-status').show();
                jQuery('.login-status').html(" Attempting to login...");
            },
            complete:function(){
                
            },
            error:function(){
                jQuery(".login-status").hide();
                jQuery(".login-alert-error").show();
                jQuery('.login-alert-error').html("Please check your internet connection");
                
            },
            success:function(data){
                if(data.success == true){
                  jQuery('.login-status').show();
                    jQuery('.login-status').html('Logged in successful.');
                    if(data.data.user_type == "member" || data.data.user_type == "resort_owner" || data.data.user_type == "boat_owner" || data.data.user_type == "other_services"){//check if session user_type is escort
                      window.location = urlPath+"/member_dashboard/"+data.data.user_id;//redirect to escort page
                      }else if(data.data.user_type == "admin"){
                        window.location = urlPath+"/admin_dashboard/"+data.data.user_id;//redirect to client page
                      }else{
                        window.reload();
                      }
                }else if(data.success == false){
                    jQuery(".login-status").hide();
                    jQuery(".login-alert-error").show();
                    jQuery('.login-alert-error').html(data.data);	
                        }else{
                    jQuery(".login-alert-error").show();
                    jQuery('.login-alert-error').html(data.message);
                                  }
            }
          });

        }

});


jQuery("#name").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});

jQuery("#phone").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});

jQuery("#email").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});

jQuery("#email-forgot").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});

jQuery("#pass").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});
jQuery("#cpass").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});

jQuery("#otp_code").on('focus', function(e){
  jQuery(this).css('border', 'solid 0px');
});

jQuery("#terms").on("change", function(){//a readstatechange event to be called when check and uncheck terms & conditions checkbox
      if(this.checked){
  //jQuery(".terms-element").show().animate({height: '200px'}, "slow");
      jQuery("#register-btn").prop('disabled', false);
      }else{
        //jQuery(".terms-element").hide().animate({height: '-200px'}, "slow");
        jQuery("#register-btn").prop('disabled', true);
      }
});

jQuery("#mem_signup").on("submit", function(e){//create a submit event for the user registration modal sub login form
  e.preventDefault();

  //create jquery form local variables for escort signup form fields
  var action = jQuery(this).attr("action");
  var title = jQuery("#title").val();
  var name = jQuery("#name").val();
  var phone = jQuery("#phone").val();
  var email = jQuery("#email").val();
  var pass = jQuery("#pass").val();
  var cpass = jQuery("#cpass").val();
  var user_type = jQuery("input[name='user_type']:checked").val();
  var site_url = jQuery('#site_url').val();

  
  if(jQuery.trim(jQuery("#name").val()) == ""){//check if name field is empty
      jQuery("#name").css('border', 'solid 1px #c03826');
      jQuery(".login-alert-error").fadeIn('slow');
      jQuery(".login-alert-error").html(" Name field is required!");
  }else if(jQuery.trim(jQuery("#phone").val()) == ""){//check if phone field is empty
    jQuery("#phone").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" Phone number is required!");
  }else if(!Number(jQuery("#phone").val())){//check if phone field entry is not numeric
    jQuery("#phone").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" phone field accepts numeric data only!");
  }else if(jQuery.trim(jQuery("#email").val()) == ""){//check if email field is empty
    jQuery("#email").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" Email field is required!");
  }else if(jQuery.trim(jQuery("#pass").val()) == "" || jQuery.trim(jQuery("#pass").val()).length < 6){//check if password field is empty or data length is less than six(6)
    jQuery("#pass").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html("Password must not be less than six(6) characters!");
  }else if(jQuery.trim(jQuery("#cpass").val()) == ""){//check if confirm password field is empty
    jQuery("#cpass").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" Confirm your password");
  }else if(jQuery.trim(jQuery("#cpass").val()) != jQuery("#pass").val()){//check if confirm password entry matches with password
    jQuery("#cpass").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" Confirmed password does not match with password entry");
  }else if(!jQuery("#terms").prop("checked")){//check if terms & condition checkbox is not checked
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" Read and agree with our terms by checking the box");
  }else{
      //else call the ajax function
      jQuery.ajax({
      headers: {
      'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
       },
      type: "POST",
      dataType: "json",
      url: action,
      data: {"title": title, "name": name, "phone": phone, "email": email, "pass": pass, "user_type": user_type},
      beforeSend:function(){
          //jQuery(".register-error").hide();
          //jQuery(".login-status").show();
          //jQuery('.login-status').html("<class=Processing data...");
          //jQuery("#register-btn").prop('disabled', true);
          //jQuery("#register-btn").html('<div class="loader"> </div>')
      },
      complete:function(){
          
      },
      error:function(){
          jQuery(".login-status").hide();
          jQuery(".login-alert-error").fadeIn('slow');
          jQuery('.login-alert-error').html("Please check your internet connection");
          
      },
      success:function(data){
          if(data.success == true){
            //jQuery('#register-btn').prop('disabled', true);
            //jQuery(".register-error").hide();
            //jQuery(".register-success").fadeIn('slow');
            jQuery('.login-status').show();
            jQuery('.login-status').html(data.message);
            
            jQuery("#mem_signup").hide();
            jQuery('#otp-form').show();
            jQuery('#otp-form').html("\r\n<h3>Confirm OTP Code<\/h3><input type=\'hidden\' id=\'site_url\' value=\'"+site_url+"\'><input type=\'hidden\' id=\'uid\' name=\'uid\' value=\'"+data.data.user_id+"\'><div class=\'form-group-inner\'><div class=\'row\'><div class=\'col-lg-8\'><input type=\'text\' id=\'otp_code\' class=\'form-control wpcf7-form-control\' placeholder=\'OTP Code\' name=\'otp_code\'><\/div><\/div> <div class=\'row\'><div class=\'col-lg-8\'> <div class=\'login-horizental\'><button class=\'button alt btn req-btn\' type=\'submit\'>Verify<\/button><\/div><\/div><\/div>\r\n");
              
          }else if(data.success == false){
            jQuery(".login-status").hide();
            jQuery(".login-alert-error").fadeIn('slow');
            jQuery('.login-alert-error').html(data.message);	
                  }else{
              jQuery(".login-status").hide();
              jQuery(".login-alert-error").fadeIn('slow');
              jQuery('.login-alert-error').html(data);
                            }
      }
    });

  }

});

jQuery("#otp-form").on("submit", function(e){
e.preventDefault();
var action = jQuery(this).attr("action");
var urlPath = jQuery("#site_url").val();
var uid = jQuery("#uid").val();
var otp_code = jQuery("#otp_code").val();
//var formdata = new FormData(this);

if(jQuery.trim(jQuery("#otp_code").val()) == ""){
  jQuery("#otp_code").css('border', 'solid 1px #c03826');
    jQuery(".login-alert-error").fadeIn('slow');
    jQuery(".login-alert-error").html(" Enter your mail otp code");
}else{
  jQuery.ajax({
    headers: {
'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
 },
   type: "POST",
   dataType: "json",
   url: action,
   data: {"uid": uid, "otp_code": otp_code},
   beforeSend:function(){
       jQuery(".login-status").show();
       jQuery('.login-alert-error').hide();
       jQuery(".login-status").html("<div class='load'>Loading...</div>");
   },
   complete:function(){
       jQuery(".load").hide();
   },
   error:function(){
  jQuery(".login-status").hide();
   jQuery(".login-alert-error").show();
   jQuery(".login-alert-error").html("Please check your internet connection");
   },
   success:function(data){
      if(data.success == true){
       jQuery("#sendEmail").prop('disabled', true);
       jQuery(".login-status").show();
       jQuery(".login-status").html(data.message);
       if(data.data.user_type == "member" || data.data.user_type == "resort_owner" || data.data.user_type == "boat_owner" || data.data.user_type == "other_services"){//check if session user_type is escort
        window.location = urlPath+"/member_dashboard/"+data.data.user_id;//redirect to escort page
        }else if(data.data.user_type == "admin"){
          window.location = urlPath+"/admin_dashboard/"+data.data.user_id;//redirect to client page
        }else{
          window.reload();
        }
      }else if(data.success == false){
        jQuery(".login-status").hide();
        jQuery(".login-alert-error").show();
        jQuery(".login-alert-error").html(data.message);
      }else{
        jQuery(".login-status").hide();
        jQuery(".login-alert-error").show();
        jQuery(".login-alert-error").html(data);
      }
        
   }
   });

  }

});


jQuery("#recover-form").on("submit", function(e){
e.preventDefault();

var action = jQuery(this).attr("action");
  
var email = jQuery("#email-forgot").val();
  
if(jQuery.trim(jQuery("#email-forgot").val()) == ""){
  jQuery("#email-forgot").css('border', 'solid 1px #c03826');
  jQuery("#recover-alert").css('display', 'block');
  jQuery("#recover-alert").html(" Enter your email address");
}else{
    jQuery.ajax({
    headers: {
    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
     },
    type: "POST",
    dataType: "json",
    url: action,
    data: {"email": email},
    beforeSend:function(){
        jQuery('.recover-status').html(" Processing data...");
    },
    complete:function(){
        
    },
    error:function(){
        jQuery("#recover-alert").css('display', 'block');
        jQuery('#recover-alert').html("Please check your internet connection");
        
    },
    success:function(data){
        if(data.success == true){
            jQuery(this).html(data.message);
        }else if(data.success == false){
            jQuery("#recover-alert").css('display', 'block');
            jQuery('#recover-alert').html(data.message);	
                }else{
            jQuery("#recover-alert").css('display', 'block');
            jQuery('#recover-alert').html(data);
                          }
    }
  });

}


});


  

  });



  

  