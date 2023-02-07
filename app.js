(function(){
    'use strict';
    
    angular.module('ShoppingListCheckOff',ShoppingListCheckOff)
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ShoppingListCheckOff.$inject = [];
    function ShoppingListCheckOff(){
        var app = this;
        app.name = 'Shopping List Check Off';

    } 

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getItems();
        toBuy.buyItem = function(index){
            ShoppingListCheckOffService.buyItem(index);
        }

    }




    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var bought = this;
        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }


    function ShoppingListCheckOffService(){
        var service = this;
        var toBuy = [
            {name:'Cookies',quantity:'10'},
            {name:'Chips',quantity:'5'},
            {name:'Milk',quantity:'2'},
            {name:'Bread',quantity:'1'},
            {name:'Eggs',quantity:'12'}
        ];
        var bought = [];

        service.buyItem = function(index){
            var item = toBuy[index];
            bought.push(item);
            toBuy.splice(index,1);

        }

        service.getItems = function(){
            return toBuy;
        }

        service.getBoughtItems = function(){
            return bought;
        }
           
        
    }
    


})()