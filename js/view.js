


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

