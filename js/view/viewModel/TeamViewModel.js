

var teamViewModel= {
    list: {
        options: {
            sort_col:"name",
            sort_dir:"asc",
            limit: null,
            offset:null,
            filter_col: null,
            filter_str: null,
            is_lookup:null,
            alt_table:null       
            },
        listTitle: "Team List",
        listButtonId: "teamButton",
        templateUrl: "js/view/templates/list-template.html",
        id: "my-list",
        tableClasses:"table table-striped table-dark"
    },
    form: {
        id: "team-form",
        addFormTitle: "Add Team",
        createFormTitle: "Create Team",
        actionUrl:"",
        method: "POST",
        suppressSubmit: true,
        templateUrl: "js/view/templates/formTemplate.html"
    },
    fields: [
        {
            label: "Id",
            name: "id",
            hidden: true,
            inputType: "hidden",
            list: true,
            validation: {
                required: false,
            }
        },
        {
            label: "Team Name",
            name: "name",
            inputType: "text",
            placeholder: "Enter your Team name here",
            list: true,
            value: null,
            validation: {
                required: true,
                requiredMessage: "Team Name is required!"
            }
        },
        {
            label: "Coach",
            name: "coach_id",
            inputType: "select",
            placeholder: "Select a Coach",
            lookupName: "coaches",
            list: true,             //you'll need to display the name of the selected coach in the list
            defaultVal: "0",       //default value for dropdown, usually the value that matches 'Select a Coach'
            validation: {
                 required: true
             }
        }
    ]

}
