var playerViewModel= {
    list: {
        //You can use these as default options for your calls to your REST Service 'list' function
        options: {
            sort_col:"first_name",
            sort_dir:"asc",
            limit: null,
            offset:null,
            filter_col: null,
            filter_str: null,
            is_lookup:null,
            alt_table:null       
            },
        listButtonId: "playerButton",   //button id for players list, use while rendering list dynamically
        listTitle: "Player List",    //title above list
        templateUrl: "js/views/templates/list-template.html",  //path to lodash template
        id: "player-list",     //table id if needed
        tableClasses:"table table-striped table-dark"   //bootstrap classes to apply to my table
    },
    //The following can be used in rendering your form (OPTIONAL)
    //dynamic rendering via lodash is recommended, but not required for the final
    form: {
        id: "my-form",
        addFormTitle: "Add Player",
        createFormTitle: "Create Player",
        actionUrl:"",
        method: "POST",
        suppressSubmit: true,
        templateUrl: "js/views/templates/formTemplate.html"
    },
    //Meta data for fields.  You can use for rendering your list dynamically.
    //if 'list' is true, then you should render this field in your list
    //I've included examples of the types of fields you will be using.
    //TODO-Finalize your field meta data by adding fields you will be using for your list
    //If you are going to dynamically render your form,  add all relevant fields and validation data
    fields: [
        {   //EXAMPLE HIDDEN FIELD
            label: "Id",
            name: "id",
            hidden: true,
            inputType: "hidden",
            list: true,
            validation: {
                required: false,
            }
        },
        {    //EXAMPLE BASIC INPUT FIELD
            label: "First Name",
            name: "first_name",
            inputType: "text",
            placeholder: "Enter your first name here",
            list: true,
            value: null,
            //as you can see,this player meta data could easily be used to dynamically validate your form
            validation: {
                required: true,
                requiredMessage: "Last name is required!"
            }
        },
        {   //EXAMPLE LOOKUP FIELD
            label: "Team",
            name: "team_id",
            inputType: "select",
            list:true,
            placeholder: "Select a Team",
            //lookupName is the table you will be using on the backend to return a list of 'options' for your
            //select box
            lookupName: "teams",
            validation: {
                required: true,
                requiredMessage: "You must select a Team!"
            }
        },
        {   //EXAMPLE FIELD WITH REGEX VALIDATION
            label: "Zip",
            name: "zip",
            inputType: "text",
            placeholder: "Enter your zip code here",
            list: false,
            validation: {
                required: true,
                requiredMessage: "Zip Code is required!",
                regex: /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/
            }
        }
    ]
}