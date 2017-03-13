angular.module('myApp', [])
  .run(function ($rootScope) {
  try {
    localStorage.setItem("testKey", "this is a test key")
    localStorage.removeItem("testKey")
    $rootScope.haslocalStorage = true
    console.log($rootScope.haslocalStorage)
  }
  catch (error) {
    $rootScope.haslocalStorage = false
    console.log("it doesn't have local storage support")
  }
}).controller('todoCtrl', function ($scope, $rootScope, $uibModal, $log) {
  $scope.getNewTodo = function () {
    return {
      id: cuid()
      , todoText: ''
      , dueDate: ''
      , done: false
    }
  }
  $scope.newTodo = $scope.getNewTodo()
  $scope.editableTodo = $scope.getNewTodo()
  $scope.syncLocalStorage = function () {
    console.log("getting to sync local storage function")
    if ($rootScope.haslocalStorage) {
      localStorage.setItem('todoList', JSON.stringify($scope.todoList))
      console.log("its in the if statement")
    }
  }
  if ($rootScope.haslocalStorage) {
    console.log("its getting to retrive from local storage")
    $scope.savedData = JSON.parse(localStorage.getItem('todoList'))
    $scope.todoList = Array.isArray($scope.savedData) ? $scope.savedData : []
  }
  else {
    console.log("its not loading anything from local storage")
    $scope.todoList = []
  }
  /*$scope.todoList = [
        {id: 1, todoText:'clean house', dueDate:"2017-03-10", done:false},
        {id: 2, todoText:'do homework', dueDate:"2017-03-15", done:false},
        {id: 3, todoText:'relax time', dueDate:"2017-03-17", done:true},         
                      
                      ];*/
  $scope.addTodo = function () {
    $scope.todoList.push($scope.newTodo)
    $scope.newTodo = $scope.getNewTodo()
    $scope.syncLocalStorage()
  };
  $scope.remove = function (todoItem) {
    $scope.todoList = $scope.todoList.filter(element => (element.id !== todoItem.id))
    $scope.syncLocalStorage()
  };
  $scope.toggleDone = function (todoItem) {
    todoItem.done = !todoItem.done
    $scope.syncLocalStorage()
  };
  
  $scope.editItem = function (todoItem) {
    $scope.editableTodo = todoItem
    $scope.syncLocalStorage()
  };  
});
