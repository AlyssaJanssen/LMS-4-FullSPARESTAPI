
  function initValidation(formName){
    var formEl = $(formName);
   //Add submit handler for the named form.  Param should be passed with "#" preappended
   formEl.submit(function(event) {
      
      validateForm();
      
      var formValid = this.checkValidity();
    
        event.preventDefault();
        event.stopPropagation();
        
      $(this).addClass('was-validated');

      if(formValid){
        handleFormSubmit(this);
        
      }
    
  });
  
  $(formName+" input").on("change",function (event) {
      'use strict';
   
      validateForm();
      $(this).addClass('was-validated');
  });
 
}

function validateForm()
{
    //checkRequired("#teamID", "Team ID is Required");
    //checkRequired("#teamName", "Team Name is Required");

}

function checkRequired(fieldName, message)
{
  var el = $(fieldName).get(0);
  if ($(fieldName).val()) {
    
      el.setCustomValidity('');  //sets to no error message and field is valid
  } else {
     
      el.setCustomValidity(message);   //sets error message and field gets 'invalid' state
      var errDivName = fieldName+"Err";
      $(errDivName).text(el.validationMessage);
  }
  formValidated();
  return $(el).val().length>0?true:false;
}
function formValidated(){
   $(".needs-validation").addClass('was-validated');
}


  // //function to postForm, serialize data to submit
  // function postForm() {
  //   let that = this;

  //   $.ajax(that.formAction, {
  //     type: that.method, // http method
  //     data: that.$form.serialize(), // data to submit
  //     success: function(data, status, xhr) {
  //       console.log("form post successful!");
  //     },
  //     error: function(jqXhr, textStatus, errorMessages){
  //       console.log("form post failed!");
  //     }
  //   });
  
  // }

