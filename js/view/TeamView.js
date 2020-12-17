class TeamView extends View {
    constructor(teamViewModel, listContainerId, formContainerId, apiUrl) {
        
        super(teamViewModel, listContainerId, formContainerId, apiUrl, "teams"); // teams api
    }
    //TODO-Place any team specific code here
    //validation and form code that might be specific to Team you can place here.
    //Note, if you decide to render the forms dynamically, and validate them using meta data, then almost all code
    //can be placed generically in the parent 'View' class.
    
}

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

  


function renderTable(tableContainerId, data) {

    let container = $(tableContainerId);

    var table = $("<table/>").addClass('table');
    table.addClass('table-dark table-hover table-bordered table-striped animate__animated animate__fadeInLeftBig ');

    //table.attr("id", id);
    var tbody = $("<tbody/>");
    var theads = $("<thead/>");
    theads = `                          
    <tr> 
    <th>ID </th> 
    <th>Name <button onclick='sortBtnClick(${this.name})'><i class="fas fa-sort"></i></button> </th>   
    <th>Coach </th>   
    <th>Phone </th>     
    <th>City  </th>   
    <th>Zip </th>   
    <th>State </th>   
    <th>Email </th>   
    <th>Actions</th>
    </tr>
            `

    tbody.append(theads);
    $.each(data, function (rowIndex, r) { // r is this
        var row = $("<tr/>");
        $.each(r, function (colIndex, c) {
            //var txt =  c; // c is this, current object in scope
            row.append($("<td/>").html(c));

        });


        let editBtn = `<button type = 'button' class = 'btn btn-sm btn-primary' data-toggle='modal' data-target='#editModal' onclick='editBtnClick(${this.id})'><i class='fas fa-edit'></i></button>`;
        let deleteBtn = `<button type = 'button'  class = 'btn btn-sm btn-danger' onclick ='onDeleteBtnClick(${this.id})'><i class='fas fa-trash-alt '></i>  </button>`;
        let infoBtn = "<button type='button' class = 'btn  btn-sm btn-info' data-toggle='tooltip' data-html='true' data-placement='right' title='<em>This team has won twelve games so far in the season.</em>'><i class='fas fa-info-circle'></i></button>";

        row.append(editBtn);
        row.append(deleteBtn);
        row.append(infoBtn);

        tbody.append(row);

    });
    

    table.append(tbody);



    var tfoot = $("<tfoot/>");
    tfoot = `
            <tr> 
            <th>ID </th> 
            <th>Name <button onclick='sortBtnClick(${this.id})'><i class="fas fa-sort"></i></button> </th>   
            <th>Coach </th>   
            <th>Phone </th>     
            <th>City  </th>   
            <th>Zip </th>   
            <th>State </th>   
            <th>Email </th>   
            <th>Actions</th>
            </tr>
            `
    tbody.append(tfoot);



    return container.html(table);

}

