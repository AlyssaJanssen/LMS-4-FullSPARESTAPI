class View   //----------(shared functions, including form validation)
{
    constructor(viewModel, listContainerId, formContainerId,  apiUrl, apiKey)
    {
        this.storage = new RestStorageService(apiUrl, apiKey, viewModel.list.options);
        this.viewModel = viewModel;
        this.listContainerId=listContainerId;
        this.formContainerId = formContainerId;
    }

    get $form() {   //getter for jquery wrapped form object
        return $("#" + this.viewModel.form.id);
    }
    get form() {  this.$form.get(0); }
    get $listContainer() { return  $("#"+this.listContainerId); }
    get $formContainer() { return $("#"+this.formContainerId); }
 
   /* renderList() - full code */
    async renderList()
    {
        try{
            this.viewModel.data = await this.storage.list(); // THIS CALLS THE API, call list on RestStorageService

            //traverse view model and find select inputs and preload any lookups (teams, coaches)
            await this.populateLookups();

            //render the list
            let templateHtml = await this.getListTemplateHtml();
            this.listTemplate = _.template(templateHtml);

            //render lodash template passing in 'this' as the 'view'
            //this will allow you to utilize view class functions in your template rendering

            this.$listContainer.html(this.listTemplate({view:this}));    

            this.bindListEvents(this.viewModel.data);   //bind list events, edit/delete/info
        }
        catch(err){
            console.log(err);
        }
    }

    bindListEvents(data)
    {    //TODO
         //Hint: if you name each button 'btn-<item-id>' (replacing <item-id> with id of current data item)
         // that makes it much easier to create your callbacks after rendering the list
       
         //create your event listeners for each table row button/icon
         // callbacks should reference the 'renderform(id)', and 'deleteListItem(id)', 'showInfo()'

        // create event listener for 'Create' button, 
        // callback calls 'this.renderForm(null)'
        let that = this;   //store current View class 'this' in 'that' (cuz 'this' is different inside loop)
        _.forEach(data, function(val)
        {
             //attach a listener to each button with id 'delete1', 'delete2' etc..
                                                                // click event handler 
                                                                     //call my class deleteListItem, passing the player.id
             $(document).on("click", "#delete" + val.id, () => {  that.deleteListItem(val.id);  });
             $(document).on("click", "#edit" + val.id, () => {  that.renderForm(val.id);  });
             $(document).on("click", "#info" + val.id, () => {  that.showInfo(val.id);  });
        });

    }
    showInfo(id) {  //TODO: show info popup  
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }

    deleteListItem(id)
    {
         //TODO
        //confirm delete
        //call storage service delete(id)
        //perform any hiding/showing/animation of row
        confirm("Are you sure you want to delete this team?");

        storage.remove(id); // delete from model data
        renderTable("#tableContainer", RestStorageService.list());

    }

    async getListTemplateHtml(){    //get list template html
       return await $.get(this.viewModel.list.templateUrl);
    }

    async populateLookups(){
        for(let field of this.viewModel.fields){
            if ("lookupName" in field){
                await this.storage.getLookup(field.lookupName);
            }
        }
    }

    getFieldValue(fieldView, fieldData,label=false){
        if ("lookupName" in fieldView){
            let data= _.find(this.storage.lookups[fieldView.lookupName], { value: fieldData[fieldView.name] });
            if (data===undefined)
                return null;
            else{ 
                return label?data.label:data.value;
            }
        }
        else{
            return fieldData[fieldView.name];
        }
    }

    async renderForm(id)
    {
         //TODO
         //for now, override this in your PlayerView or TeamView and move your current form code 
         // you will need to create a Player form (just pull the 'coach' code out of your Team form)
         // into these classes.  We won't be dynamically rendering the form for the final
         //let html= `<button type="button" onclick="deleteTeam(${team.id})">Delete</button>`
         //on click call global deleteTeam function with team id
         //----------
         //Since we want to call back into the class, what we do is something like this in our lodash template
         //`<button type="button" id="delete-<$team.id%>">Delete</button>`
         //then, after stuffing the html into the dom, connect up the callbacks later
         let that = this;   //store current View class 'this' in 'that' (cuz 'this' is different inside loop)
         _.forEach(players, function(player)
         {
              //attach a listener to each button with id 'delete1', 'delete2' etc..
              $(document).on("click", "#deleteBtn" + player.id, () => {
                     //call my class deleteListItem, passing the player.id
                     that.deleteListItem(player.id);
               });
          });
         
    }
}