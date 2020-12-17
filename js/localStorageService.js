
class storageService { //-------------------------set breakpoints in inspect, index.html, comment out everything, test each function as you go

   //======================Application- can clear local storage
  // "use strict"
   constructor(data, key) {
      this.origModel = data;        //original data, should never change
      this.model = _.cloneDeep(data);    //lodash, deep copy of data
      this.key = key;  //localstorage key for data,  use localStorage[this.key]
      this.startId = 100;
   }
   size() {
      //should return the number of items in model.data// array
      return _.size(this.model.data);
   }
   reset() {
      //should clear local storage 
      //should restore model from origModel (clone)
      this.model = _.cloneDeep(this.origModel);
      this.clear();
   }
   clear() {
      //should clear local storage
      localStorage.removeItem(this.key);
      localStorage.clear();
   }
   store() {
      //should store your model in localStorage // stringify model, put in localStorage
      localStorage[this.key] = JSON.stringify(this.model);
   }
   retrieve() {
      //should retrieve your model from localStorage.
      //updates local model if not null
     if (localStorage.getItem(this.key) !== null){
        this.model = JSON.parse(localStorage[this.key]);
     }
   }
   list() {
      //return the list of data items as is
      return this.model.data;
   }
   sort(cols, sorts, perm = false) {
      //returns a copy of the model, sorted using the 'cols' and 'sort' specifications (see index.html for example)
      // storageSvc.sort(['name'],['asc'])
      // if 'perm' param is set to true, you should update the internal model.data with the sorted list
      const ret = _.orderBy(this.model.data, cols, sorts);
      if (perm) {
         this.model.data = ret;
         this.store();
      }
      return ret;
   }
   filter(filterObj) {
      //returns a copy of the filtered array
      //e.g., storageSvc.filter({coachLicenseLevel:1});
      return this.model.data.filter((d) => {
         for (const key of Object.keys(filterObj)) {
            if (d[key] !== filterObj[key]) {
               return false;
            }
         }
         return true;
         
      });


      // return _.filter(this.model.data, function(obj){
      //    return filterObj.name.indexOf(filterObj.name) > -1;
      // } );

   }
   getItem(getId) {
      //returns the item in the array with id=getId, null if it is not found. returning actual object
      return this.model.data.find((d) => d.id === getId);
   }
   create(obj) {
      //append new object to data store
      // persist in local storage by calling store()
      obj.id = this.startId++;
      this.model.data = _.concat(this.model.data, [obj]);
      this.store();
   }
   update(obj) {// 
      //find index of object in array , find obj with same ID, overriding it
      //update object with new contents
      // persist in local storage by calling store()
      let index = _.findIndex(this.model.data, {id: obj.id });
      this.model.data[index] = obj;
      this.store();
      
   }
   remove(removeId) {
      //remove object with specified id from model.data
      // persist in local storage by calling store()
      _.remove(this.model.data, {id: removeId });
      this.store();
   }
   getLookup(name) {
      //returns the requested lookup data // array of leagues or divisions, etc
      return this.model.lookups[name];
   }
}