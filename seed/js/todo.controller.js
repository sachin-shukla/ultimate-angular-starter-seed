function TodoController(TodoService) {

    var ctrl =this;

    ctrl.newTodo = '';
    ctrl.list = [];

    function getTodos(){
        TodoService.retrieve().then(function(response){
            ctrl.list = response;
        },function(error){
            console.log(error);
        });
    }

    ctrl.addTodo =  function(){
        if(!ctrl.newTodo){
            return; 
        }
        TodoService.create({
            title : ctrl.newTodo,
            completed : false
        }).then(function(response){
            ctrl.list.unshift(response);
            ctrl.newTodo = '';
        });
    };

    ctrl.updateTodo =  function(item,index){
        if(!item.title){
            ctrl.removeTodo(item,index);
            return;
        }
        TodoService.update(item);

    };

    ctrl.removeTodo =  function(item, index){

        TodoService.remove(item).then(function(response){
            ctrl.list.splice(index,1);
        }, function (error){
            console.log(error);
        });       
    };

    ctrl.getRemaining =  function(){
        return ctrl.list.filter(function(item){
            return !item.completed;
        });
    };

    ctrl.toggleState =  function(item){
        TodoService.update(item).then(function(response){

        },function(){
            item.completed =  !item.completed;
        });
    };

    getTodos();
}

angular.module('app')
    .controller('TodoController' ,  TodoController);