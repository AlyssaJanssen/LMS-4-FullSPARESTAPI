class TeamView extends View {
    constructor(teamViewModel, listContainerId, formContainerId, apiUrl) {
        
        super(teamViewModel, listContainerId, formContainerId, apiUrl, "teams"); // teams api
    }
    //TODO-Place any team specific code here
    //validation and form code that might be specific to Team you can place here.
    //Note, if you decide to render the forms dynamically, and validate them using meta data, then almost all code
    //can be placed generically in the parent 'View' class.

}