angular
  .module('app', ['firebase'])
  .constant('firebaseConfig', {
    apiKey: "AIzaSyAsxvZusECZWZ7-FXP-1TeCcBhq_68fKsI",
    authDomain: "webapp-final.firebaseapp.com",
    databaseURL: "https://webapp-final.firebaseio.com",
    projectId: "webapp-final",
    storageBucket: "webapp-final.appspot.com",
    messagingSenderId: "143505137992"
  })
  .run(firebaseConfig => firebase.initializeApp(firebaseConfig))
  .service('dbRefRoot', DbRefRoot)
  .service('customers', Customers)
  .controller('CustomerCtrl', CustomerCtrl)

function DbRefRoot() {
  return firebase.database().ref()
}

function Customers(dbRefRoot, $firebaseObject, $firebaseArray) {
  const dbRefCustomers = dbRefRoot.child('customers')

  this.get = function get(id) {
    return $firebaseObject(dbRefCustomers.child(id))
  }

  this.getAll = function getAll() {
    return $firebaseArray(dbRefCustomers)
  }

}

function CustomerCtrl(customers) {

  this.getNewCustomer = function getNewCustomer() {
    return {
      taskName: '',
      dueDate: '',
      comment: '',
      importance: ''
    }
  }

  this.newCustomer = this.getNewCustomer()

  
  this.customers = customers.getAll()

  this.remove = function remove(customer) {
    if (confirm("Are your sure you want to delete this customer?")) {
      this.customers.$remove(customer)
    }
  }

  this.save = function save(customer) {
    /*if(){
      this.customers.$save(customer)
    }*/
    this.customers.$save(customer)
  }
  
  /* this function is for changing the states from high to low*/
  /*this.changeImportance = function(customer){
    console.log("its getting to changeImportance function")
    if (importance == 'low'){
      
    }
    else if (importance == 'avarage'){
      
    }
    else{
      
    }
  }*/

  this.addCustomer = function addCustomer(newCustomer) {
    console.log('Called addCustomer')
    this.customers
      .$add(newCustomer)
      .then( newRef => {
        console.log('new customer id = ' + newRef.key)
        this.newCustomer = this.getNewCustomer()
      })
    console.log('addCustomer function complete')
  }
}
