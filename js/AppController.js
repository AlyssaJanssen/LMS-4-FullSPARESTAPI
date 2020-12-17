

$("document").ready(function () {


     // var controller = new AppController(playerViewModel, teamViewModel,// --new entry point to instantiate appService
     //     "tableContainer", "editForm", "localhost:8080"); //-----changed from 8081
     // controller.renderTeamListView();
     
})




class AppController
{
    constructor(playerViewModel, teamViewModel, listContainerId, formContainerId, apiUrl)
   {
        this.playerView = new PlayerView(playerViewModel, listContainerId, formContainerId, apiUrl)
        this.teamView = new TeamView(teamViewModel, listContainerId, formContainerId, apiUrl)
    }
    renderTeamListView()
   {
      this.teamView.renderList();
    }
    renderPlayerListView()
   {
        this.playerView.renderList();
   }
}
