
let storageSvc = null;
var teamRow = null;


$("document").ready(function () {


    // var controller = new AppController(playerViewModel, teamViewModel,// --new entry point to instantiate appService
    //     "tableContainer", "editForm", "localhost:8080"); //-----changed from 8081
    // controller.renderTeamListView();
    
    document.getElementById("searchInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.code === 13) {
        document.getElementById("searchBtn").click(); // htis calls searchTeam() function
    }
});



    storageSvc = new storageService(teamData, "teamData");

    renderTable("#tableContainer", storageSvc.list());


    initValidation("#editForm");


    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

})





function sortBtnClick(name) {

    storageSvc.sort(['name'], ['asc'], true);
    // re render sorted table
    renderTable("#tableContainer", storageSvc.list());
}

function searchTeam() {


    let searchInput = document.getElementById("searchInput").value;
    //$searchInput.serializeArray(); //jquery takes data, sticks into object

    //storageSvc.filter({ 'name': $searchInput });
    let filteredResults = storageSvc.filter({ name: searchInput });
    // re render sorted table
    renderTable("#tableContainer", filteredResults);
}


function onDeleteBtnClick(id) {
    confirm("Are you sure you want to delete this team?");

    storageSvc.remove(id); // delete from model data
    renderTable("#tableContainer", storageSvc.list());

}

function editBtnClick(id) {

    //localStorage.get(id) to get the item to edit
    teamRow = storageSvc.getItem(id);
    //copy the values from the object into your form inputs
    // document.forms['editForm'].elements['teamID'].value = teamRow.id;
    // document.forms['editForm'].elements['teamName'].value = teamRow.name; // IT WORKED WOOOOO!
    // document.forms['editForm'].elements['coachName'].value = teamRow.coachName; 
    // document.forms['editForm'].elements['phone'].value = teamRow.phone; 
    // document.forms['editForm'].elements['city'].value = teamRow.city; 
    // document.forms['editForm'].elements['state'].value = teamRow.state; 
    // document.forms['editForm'].elements['zip'].value = teamRow.zip; 
    // document.forms['editForm'].elements['email'].value = teamRow.email; 

    // populate form inputs with model data
    $("#teamId").val(teamRow.id);
    $("#teamName").val(teamRow.name);
    $("#coachName").val(teamRow.coachName);
    $("#phone").val(teamRow.phone);
    $("#city").val(teamRow.city);
    $("#state").val(teamRow.state);
    $("#zip").val(teamRow.zip);
    $("#email").val(teamRow.email);

    //  let teamId = $("#teamId").val();  
}

function handleFormSubmit(form) {

    let $form = $(form);

    let submitData = $form.serializeArray(); //jquery takes data, sticks into object

    // then you need to save all values from edit Input
    teamRow.name = $("#teamName").val();
    teamRow.coachName = $("#coachName").val();
    teamRow.phone = $("#phone").val();
    teamRow.city = $("#city").val();
    teamRow.state = $("#state").val();
    teamRow.zip = $("#zip").val();
    teamRow.email = $("#email").val();

    if (teamRow.id != null) // if team is  being EDITED, update in model
    {
        storageSvc.update(teamRow); // updates the model data with new edit Input
        teamRow.id = $("#teamID").val();
    }
    else  // ID is null so this is a new Team being added, call create to add to model data
    {
        storageSvc.create(teamRow); /// create adds the new object to storage

        //Re render the list using localStorage.list() to get the data.
    }
    renderTable("#tableContainer", storageSvc.list()); // re render table with new data row added

    // then close the modal
    $('#editModal').modal('hide');
}

function addTeam(id) {
    // the add team button click pops up modal and calls this to set id to null
    teamRow = {
        id: null,

    };
    // then they click submit which calls the submit func then handleFormSubmit() above

}