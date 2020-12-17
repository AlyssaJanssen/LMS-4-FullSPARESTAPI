
//The 'model'  contains 'data' related functions for performing crud on an entity.
//This service will consume your REST API from LMS3.

class RestStorageService {
  constructor(host, type,                                                                             
    defaultOptions = {
      sort_col: null,
      sort_dir: null,
      limit: null,
      offset: null,
      filter_col: null,
      filter_str: null,
      is_lookup: null,
      alt_table: null
    }) {
    this.apiHostURL = host;
    this.apiType = type;
    this._list = null;
    this.defaultOptions = defaultOptions;
    this.startId = 100; // var used to store new id on create

    //options object looks like
    /*{
      sort_col:"first_name",
      sort_dir:"desc",
      limit: 10,
      offset:10,
      filter_col: "first_name",
      filter_str: "Ke" // (note, in your UI I would not call list until at least 3 chars have been typed)
    };*/
    this._lookups = {};
  }

  get list() { return this._list }   //getter for last retrieved list, in case you don't want to call list again
  get lookups() { return this._lookups; }   //getter for lookups object

  /* List function-I'm giving this one to you */
  // example call: let list = await storage.list({sort_col:"last_name", sort_dir:"asc", limit:20, offset:0});

  async list(options = this.defaultOptions) {
    //if we are doing a lookup, call the api for the lookup (alt_table)
    //otherwise, just call api for default apiType
    let apiName = options.is_lookup != null && options.alt_table != null ? options.alt_table : this.apiType;

    let url = `http://${this.apiHostURL}/${apiName}/${this.getQueryString(options)}`;

    let data = await $.ajax({   ///-------------API DATA
      type: 'GET',
      url: url,
      async: true,
      contentType: "application/json",
      dataType: "json"
    });

    if (options.is_lookup != null) {
      //store lookups for use later
      this._lookups[options.alt_table] = data;
    }
    else {
      //otherwise, just get the normal list data.
      this._list = data;
    }
    return data;
  }

  async get(id) {
    //TODO-call api to get item with 'id'
    // this.get(req.params.id, function(err, id) {
    //   if (err)
    //       res.send(err);
    //   res.json(id);
    //  });


     let url = `http://${this.apiHostURL}/${apiName}/${this.getQueryString(options)}`;

     let data = await $.ajax({   ///-------------API DATA BEING CALLED
       type: 'GET',
       url: url,
       async: true,
       data: data,
       contentType: "application/json",
       dataType: "json"
     });

////////////////
  //returns the item in the array with id=getId, null if it is not found. returning actual object
  //return this.model.data.find((d) => d.id === getId);



   };
  

  async update(id, postData) {
    //TODO - call api to update item
    //return updated object
    // update item with id
    id.put(function(req, res) {

      postData.findById(req.params.id, function(err, postData) {

          if (err)
              res.send(err);

          this.postData = req.body.postData;  // update info

          // save the item
          postData.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'Item updated!' });
          });

      });
  });

  }

  async create(postData) {
    //TODO-call api to create a new item
    //return new object (with new db id)

    postData.post(function(req, res) {

      var item = new TeamView();      // create a new instance of the model
      item.name = req.body.name;  // set the items name (comes from the request)

      // save the bear and check for errors
      item.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Item created!' });
      });

  });



          //append new object to data store
      // persist in local storage by calling store()
      // obj.id = this.startId++;
      // this.model.data = _.concat(this.model.data, [obj]);
      // this.store();
  }

  async delete(id)  // this was called remove() in LMS2
  {
      //   //TODO-call api to remove item
    id.delete(function(req, res) {
      id.remove({
          _id: req.params.id
      }, function(err, id) {
          if (err)
              res.send(err);

          res.json({ message: 'Successfully deleted' });
      });
  });
    
  
    
    

  //   _.remove(this.model.data, {id: removeId });
  //   this.store();
  
  }




  /* getLookup */
  /* This function passes two additional query string params to the 'list' call
     You will need to modify your list code in the REST API to return an array of objects that
     contain  just 'label' (name for Team, first_name+""+last_name for player) and 'value' (id of team/coach)

      Here's an example of what a lookup object will look like
       {
           "teams": [{"label":"Raptors","value":"1"}, ....],
           "coaches": [{"label":"John Jenson","value":"2"}, ....]
       }

       As you retrieve lookups, they will be stored in the service so you don't need
       to look them up again.
  */
  async getLookup(name) {

    if (!(name in this._lookups)) {  //if not cached yet, call
      await this.list({
        is_lookup: true,
        alt_table: name
      });
    }

    return this._lookups[name];
  }

  /* UTILITY FUNCTIONS */
  getQueryString(options) {     //string to break out options object into a query string

    let query = "?";
    let count = 0;
    for (var key in options) {
      if (options[key] != null) {
        query += count > 0 ? "&" : "";
        query += `${key}=${options[key]}`;
        count++;
      }
    }
    return query.length > 1 ? query : "";
  }
}