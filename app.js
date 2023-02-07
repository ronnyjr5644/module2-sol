(function () {
    'use strict';
    //nbarman
    angular.module('ShoppingListCheckOff', [])
    .controller('AddToListController', AddToListController )
    .controller('ToBuyListController', ToBuyListController )
    .provider('ShoppingListItemsService', ShoppingListItemsServiceProvider);
    var imgStatus = "moneyface";
    
    var itemsList = [
    
            {
              name : "Milk", quantity: 10
            },
            {
              name : "Cookies", quantity: 5
            },
            {
              name : "Chips", quantity: 4
            },
            {
              name : "Wafers", quantity: 6
            },
            {
              name : "Bismol", quantity: 8
            },
          ];
    
     
    
    
    //Controller#1 ToBuyListController
    ToBuyListController.$inject = ['$scope', 'ShoppingListItemsService'];
    function ToBuyListController($scope, ShoppingListItemsService){
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListItemsService.getItemsOnList();
        toBuyCtrl.addToBoughtList = function(index){
        ShoppingListItemsService.itemBought(index);
        var checklistStatus =  ShoppingListItemsService.setImgStatus();
      };
    }
    
    
    // Controller#2 AddToListController
    AddToListController.$inject = ['$scope', 'ShoppingListItemsService'];
    function AddToListController($scope, ShoppingListItemsService){
    var itemsAdded = this;
    itemsAdded.items = ShoppingListItemsService.getItemsBought();
    
    }
    
    
    //Service
    function ShoppingListItemsService(items){
    
      var service  = this;
      var itemsBought = [];
      service.itemBought = function(index){
          var item = {name : items[index].name, quantity : items[index].quantity};
          //console.log(item);
          itemsBought.push(item);
          items.splice(index,1);
        };
    
      service.getItemsBought = function(){
        return itemsBought;
      };
    
      service.getItemsOnList = function(){
        return items;
      };
      service.setImgStatus = function(){
                if(itemsList.length == 0){
                        imgStatus = "thumbsup";
    
                      }
                      return imgStatus;
          }
      service.getImgStatus = function(){
         return imgStatus;
      }
    
    }
    
    //Provider
    function ShoppingListItemsServiceProvider(){
    
      var provider = this;
      provider.items = itemsList;
    
            provider.$get = function(){
            var shoppingListItems = new ShoppingListItemsService(provider.items);
            return   shoppingListItems;
          };
    
    }
    
    })();
    