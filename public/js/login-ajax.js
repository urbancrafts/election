function remove_field_border(id){
  $("#"+id).css('border', 'none');
}

$(document).ready(function(){

  
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 6000
    });



    $("#login-form").on("submit", function(e){
        e.preventDefault();
  
        var action = $(this).attr("action");
        var loginId = $("#login-email").val();
        var pass = $("#login-pass").val();
        
        var urlPath = $("#login-url-path").val();

        var btn = $("#login-btn");
        
        if($.trim($("#login-email").val()) == "" || $.trim($("#login-pass").val()) == ""){
            //jQuery("#login-alert").css('display', 'block');
            //jQuery("#login-alert").html(" Enter your login details");

            Toast.fire({
              icon: 'error',
              title: 'Enter your email and password!'
            });
            //window.alert('Fields empty!');

        }else{
        
            $.ajax({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
            type: "POST",
            dataType: "json",
            url: action,
            data: {"loginId": loginId, "pass": pass},
            beforeSend:function(){
                
                //$('.login-status').html(" Attempting to login");
                Toast.fire({
                  icon: 'info',
                  title: 'Attempting to login'
                });
            },
            complete:function(){
                
            },

            success:function(data){
              if(data.status == true){
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Logged in successfully.'
                  })
              window.location = urlPath;
              }else if(data.status == false){

                Toast.fire({
                  icon: 'error',
                  title: data.message
                });

                      }else{
                        Toast.fire({
                          icon: 'error',
                          title: data
                        });
                  
                                }
          },

            error:function(jqXHR, exception){

              if(jqXHR.status === 0){
                Toast.fire({
                  icon: 'warning',
                  title: 'Please check your internet connection'
                });
              }else if(jqXHR.status == 404){
                Toast.fire({
                  icon: 'warning',
                  title: 'Request route not found.'
                });
              }else if(jqXHR.status == 500){
                Toast.fire({
                  icon: 'warning',
                  title: 'Internal Server Error [500]'
                });
              }else if(jqXHR.status == 422){
                var errors = jqXHR.responseJSON;
          // $.each(json.responseJSON, function (key, value) {
          //     $('.'+key+'-error').html(value);
          // });
          Toast.fire({
            icon: 'error',
            title: errors.message
          });
              }else if(exception === 'parsererror'){
                Toast.fire({
                  icon: 'warning',
                  title: 'Requested JSON parse failed'
                });
              }else if(exception === 'timeout'){
                Toast.fire({
                  icon: 'warning',
                  title: 'Time out error'
                });
              }else if(exception === 'abort'){
                Toast.fire({
                  icon: 'warning',
                  title: 'Ajax request aborted'
                });
              }
                
            },
            
          });

        }

});


$("#fpassword-email-form").on("submit", function(e){
  e.preventDefault();

  var action = $(this).attr("action");
  var loginId = $("#email").val();
  
  
  var urlPath = $("#url-path").val();

  var btn = $("#login-btn");
  
  if($.trim($("#email").val()) == "" ){
      //jQuery("#login-alert").css('display', 'block');
      //jQuery("#login-alert").html(" Enter your login details");

      Toast.fire({
        icon: 'error',
        title: 'Enter your email address!'
      });
      //window.alert('Fields empty!');

  }else{
  
      $.ajax({
      headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
      type: "POST",
      dataType: "json",
      url: action,
      data: {"email": loginId},
      beforeSend:function(){
          
          //$('.login-status').html(" Attempting to login");
          Toast.fire({
            icon: 'info',
            title: 'Processing....'
          });
      },
      complete:function(){
          
      },

      success:function(data){
        if(data.status == true){
          
            Toast.fire({
              icon: 'success',
              title: data.message
            })
            window.location = urlPath+'/'+data.data.user[0].id;
        }else if(data.status == false){

          Toast.fire({
            icon: 'error',
            title: data.message
          });

                }else{
                  Toast.fire({
                    icon: 'error',
                    title: data
                  });
            
                          }
    },

      error:function(jqXHR, exception){

        if(jqXHR.status === 0){
          Toast.fire({
            icon: 'warning',
            title: 'Please check your internet connection'
          });
        }else if(jqXHR.status == 404){
          Toast.fire({
            icon: 'warning',
            title: 'Request route not found.'
          });
        }else if(jqXHR.status == 500){
          Toast.fire({
            icon: 'warning',
            title: 'Internal Server Error [500]'
          });
        }else if(jqXHR.status == 422){
          var errors = jqXHR.responseJSON;
          // $.each(json.responseJSON, function (key, value) {
          //     $('.'+key+'-error').html(value);
          // });
          Toast.fire({
            icon: 'error',
            title: errors.data.errors
          });
        }else if(exception === 'parsererror'){
          Toast.fire({
            icon: 'warning',
            title: 'Requested JSON parse failed'
          });
        }else if(exception === 'timeout'){
          Toast.fire({
            icon: 'warning',
            title: 'Time out error'
          });
        }else if(exception === 'abort'){
          Toast.fire({
            icon: 'warning',
            title: 'Ajax request aborted'
          });
        }
          
      },
      
    });

  }

});


$("#otp-verify-form").on("submit", function(e){
  e.preventDefault();

  var action = $(this).attr("action");
  var code1 = $("#digit-1").val();
  var code2 = $("#digit-2").val();
  var code3 = $("#digit-3").val();
  var code4 = $("#digit-4").val();
  var code5 = $("#digit-5").val();
  var code6 = $("#digit-6").val();
  
  var general_code = code1+code2+code3+code4+code5+code6;
  
  var urlPath = $("#url-path").val();
  var user_id = $("#user_id").val();

  var btn = $("#login-btn");
  
  if($.trim($("#digit-1").val()) == "" ){
      //jQuery("#login-alert").css('display', 'block');
      //jQuery("#login-alert").html(" Enter your login details");
      Toast.fire({
        icon: 'error',
        title: 'An empty code input field!'
      });
      //window.alert('Fields empty!');
      $("#digit-1").css('border', 'solid 1px red');


  }else if($.trim($("#digit-2").val()) == ""){

    Toast.fire({
      icon: 'error',
      title: 'An empty code input field!'
    });
    //window.alert('Fields empty!');
    $("#digit-2").css('border', 'solid 1px red');

  }else if($.trim($("#digit-3").val()) == ""){

    Toast.fire({
      icon: 'error',
      title: 'An empty code input field!'
    });
    //window.alert('Fields empty!');
    $("#digit-3").css('border', 'solid 1px red');

  }else if($.trim($("#digit-4").val()) == ""){

    Toast.fire({
      icon: 'error',
      title: 'An empty code input field!'
    });
    //window.alert('Fields empty!');
    $("#digit-4").css('border', 'solid 1px red');

  }else if($.trim($("#digit-5").val()) == ""){

    Toast.fire({
      icon: 'error',
      title: 'An empty code input field!'
    });
    //window.alert('Fields empty!');
    $("#digit-5").css('border', 'solid 1px red');

  }else if($.trim($("#digit-6").val()) == ""){

    Toast.fire({
      icon: 'error',
      title: 'An empty code input field!'
    });
    //window.alert('Fields empty!');
    $("#digit-6").css('border', 'solid 1px red');

  }else{
  
      $.ajax({
      headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
      type: "POST",
      dataType: "json",
      url: action,
      data: {"user_id": user_id, "code": general_code},
      beforeSend:function(){
          
          //$('.login-status').html(" Attempting to login");
          Toast.fire({
            icon: 'info',
            title: 'Processing....'
          });
      },
      complete:function(){
          
      },

      success:function(data){
        if(data.status == true){
          
            Toast.fire({
              icon: 'success',
              title: data.message
            })
            window.location = urlPath+'/'+user_id;
        }else if(data.status == false){

          Toast.fire({
            icon: 'error',
            title: data.message
          });

                }else{
                  Toast.fire({
                    icon: 'error',
                    title: data
                  });
            
                          }
    },

      error:function(jqXHR, exception){

        if(jqXHR.status === 0){
          Toast.fire({
            icon: 'warning',
            title: 'Please check your internet connection'
          });
        }else if(jqXHR.status == 404){
          Toast.fire({
            icon: 'warning',
            title: 'Request route not found.'
          });
        }else if(jqXHR.status == 500){
          Toast.fire({
            icon: 'warning',
            title: 'Internal Server Error [500]'
          });
        }else if(jqXHR.status == 422){
          var errors = jqXHR.responseJSON;
          // $.each(json.responseJSON, function (key, value) {
          //     $('.'+key+'-error').html(value);
          // });
          Toast.fire({
            icon: 'error',
            title: errors.message
          });
        }else if(exception === 'parsererror'){
          Toast.fire({
            icon: 'warning',
            title: 'Requested JSON parse failed'
          });
        }else if(exception === 'timeout'){
          Toast.fire({
            icon: 'warning',
            title: 'Time out error'
          });
        }else if(exception === 'abort'){
          Toast.fire({
            icon: 'warning',
            title: 'Ajax request aborted'
          });
        }
          
      },
      
    });

  }

});



$("#new-password-entry-form").on("submit", function(e){
  e.preventDefault();

  var action = $(this).attr("action");
  var password = $("#password").val();
  var cpassword = $("#c-password").val();
  
  
  var urlPath = $("#url-path").val();
  var user_id = $("#user_id").val();

  var btn = $("#login-btn");
  
  if($.trim($("#password").val()) == "" ){
      //jQuery("#login-alert").css('display', 'block');
      //jQuery("#login-alert").html(" Enter your login details");
      Toast.fire({
        icon: 'error',
        title: 'Please enter your new password!'
      });
      //window.alert('Fields empty!');


  }else if($.trim($("#c-password").val()) == ""){

    Toast.fire({
      icon: 'error',
      title: 'Please confirm your new password!'
    });
    //window.alert('Fields empty!');

  }else{
  
      $.ajax({
      headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
      type: "POST",
      dataType: "json",
      url: action,
      data: {"user_id": user_id, "password": password, "password_confirmation": cpassword},
      beforeSend:function(){
          
          //$('.login-status').html(" Attempting to login");
          Toast.fire({
            icon: 'info',
            title: 'Processing....'
          });
      },
      complete:function(){
          
      },

      success:function(data){
        if(data.status == true){
          
            Toast.fire({
              icon: 'success',
              title: data.message
            })
            window.location = urlPath;
        }else if(data.status == false){

          Toast.fire({
            icon: 'error',
            title: data.message
          });

                }else{
                  Toast.fire({
                    icon: 'error',
                    title: data
                  });
            
                          }
    },

      error:function(jqXHR, exception){

        if(jqXHR.status === 0){
          Toast.fire({
            icon: 'warning',
            title: 'Please check your internet connection'
          });
        }else if(jqXHR.status == 404){
          Toast.fire({
            icon: 'warning',
            title: 'Request route not found.'
          });
        }else if(jqXHR.status == 500){
          Toast.fire({
            icon: 'warning',
            title: 'Internal Server Error [500]'
          });
        }else if(jqXHR.status == 422){
          var errors = jqXHR.responseJSON;
          // $.each(json.responseJSON, function (key, value) {
          //     $('.'+key+'-error').html(value);
          // });
          Toast.fire({
            icon: 'error',
            title: errors.data.errors
          });
        }else if(exception === 'parsererror'){
          Toast.fire({
            icon: 'warning',
            title: 'Requested JSON parse failed'
          });
        }else if(exception === 'timeout'){
          Toast.fire({
            icon: 'warning',
            title: 'Time out error'
          });
        }else if(exception === 'abort'){
          Toast.fire({
            icon: 'warning',
            title: 'Ajax request aborted'
          });
        }
          
      },
      
    });

  }

});



jQuery("#register-form").on("submit", function(e){
  e.preventDefault();
  var action = jQuery(this).attr("action");
  var name = jQuery("#name").val();
  var phone = jQuery("#phone").val();
  var email = jQuery("#email").val();
  var age = jQuery("#age").val();
  var pass = jQuery("#passwd").val();
  var cpass = jQuery("#cpasswd").val();
  
  var urlPath = jQuery("#register-url-path").val();
  
  if(jQuery.trim(jQuery("#name").val()) == ""){
      jQuery("#register-alert").css('display', 'block');
      jQuery("#register-alert").html(" Name field is required!");
  }else if(jQuery.trim(jQuery("#phone").val()) == ""){
    jQuery("#register-alert").css('display', 'block');
    jQuery("#register-alert").html(" Phone number is required!");
  }else if(!Number(jQuery("#phone").val())){
    jQuery("#register-alert").css('display', 'block');
    jQuery("#register-alert").html(" phone field accepts numeric data only!");
  }else if(jQuery.trim(jQuery("#email").val()) == ""){
    jQuery("#register-alert").css('display', 'block');
    jQuery("#register-alert").html(" Email field is required!");
  }else if(jQuery.trim(jQuery("#age").val()) == ""){
    jQuery("#register-alert").css('display', 'block');
    jQuery("#register-alert").html(" Enter your age!");
  }else if(jQuery.trim(jQuery("#passwd").val()) == ""){
    jQuery("#register-alert").css('display', 'block');
    jQuery("#register-alert").html(" Enter your password!");
  }else if(jQuery.trim(jQuery("#cpasswd").val()) != jQuery.trim(jQuery("#passwd").val())){
    jQuery("#register-alert").css('display', 'block');
    jQuery("#register-alert").html(" Confirmed password does not match with password entry");
  }else{
  
      jQuery.ajax({
      headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
      type: "POST",
      dataType: "json",
      url: action,
      data: {"loginId": loginId, "pass": pass},
      beforeSend:function(){
          jQuery('.register-status').html(" Processing data...");
      },
      complete:function(){
          
      },
      error:function(){
          jQuery("#register-alert").css('display', 'block');
          jQuery('#register-alert').html("Please check your internet connection");
          
      },
      success:function(data){
          if(data.success == true){
              jQuery('.register-status').css('color', 'green');
              jQuery('.register-status').html(name+' registered successful.');
          window.location = urlPath+"/profile/"+data.uid;
          }else if(data.success == false){
              jQuery("#register-alert").css('display', 'block');
              jQuery('#register-alert').html(data.message);	
                  }else{
              jQuery("#register-alert").css('display', 'block');
              jQuery('#register-alert').html(data);
                            }
      }
    });

  }

});



jQuery("#services").change(function(e){
    var service = jQuery(this).val();
    var path = "";
    jQuery.ajax({
          headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
           },
          type: "POST",
          dataType: "json",
          url: path,
          data: {"service": service},
          beforeSend:function(){
             jQuery('#request-status').html("Loading data...");
          },
          complete:function(){
              
          },
          error:function(){
              jQuery('#request-status').html("Please check your internet connection");
              
          },
          success:function(data){
              if(data.success == true){
              jQuery('#sub-services').html(data.data);	
              }else if(data.success == false){
                  jQuery('#request-status').html(data.message);	
  
              }else{
                  jQuery('#request-status').html(data);
                                }	
          }  
       });
  });





});


