/**
 * Library/Tools: Javascript, Node.JS
 * Author: John Hill 
 * Created: August 26th, 2020
 * 
 * Description: This file(Allocation_Tool) contains a ES6 class that will calculate the most efficient solution for an customer order containing various merchandise to be delivered
 *              to a customer based upon inventory from different Warehouses 
 * 
 **/

class AllocationTool{
    //Name: Constructor 
    //Use: This method will fulfil the ES6 class requirement of a constructor 
    //Params: None used or needed
    //Returned Item: N.A
    //Fail: N.A 
    constructor(){
        //Empty
    };


    //Name: getBestPrice
    //Use: This method will find the best method to fullfil an order based on the inventory's of given warehouses   
    //Params: warehouse = an array that contains the warehouse name and inventory of given merchandise  
    //       merchandise = an object that contains the desired merchandise and amount of Items 
    //Returned Item: An array will be returned with objects containing used warehouses and the number of items removed from that warehouse. 
    //Fail: returned array will be null in the event that the warehouse has < inventory than is required  
    getBestPrice(merchandise,warehouse){
        //Using let to allow reassignment of empty array 
        let outcome =[];

        //Creating count to quickly find amount of merchandise 
        //TODO: if failure set to Object.key(merchandise)
        let count =0;
        for(var i in merchandise){
            count++
        }
        //if used to quickly catch null arrays thus returning a fail 
        if(Object.keys(merchandise).length === 0 || warehouse.length===0 ){
            return outcome
        }
        //iteration chosen merchandise of count  
        for(let chosenMerchandise of Object.keys(merchandise)){
            
            //stores where index is stored
            let indexLocation = 0;
            //Stores capture of the amount of merchandise required 
            let {[chosenMerchandise]: merchandiseRequired} = merchandise;
            //This object will hold the warehouse and merchandise that are found
            let merchandiseFound ={}
            
            //while loop used to continue iteration on conditions index < warehouse and inventoryRequired is greater than 0
            while(  indexLocation< warehouse.length   && merchandiseRequired > 0){
                //let counter to used to store the quantity of merchandise taken 
                let merchandiseTaken = 0;
                //let to get the name of warehouses at indexLocation
                let{name: warehouseName } = warehouse[indexLocation];
                //let used to find merchandise found
                let{warehouseInventory:{[chosenMerchandise]:merchandiseAvailable}} = warehouse[indexLocation] //TODO: find undefined bug
            
                //These ifs are used to check for undefined values and making sure there is enough quantity for the request
                if(merchandiseAvailable!== undefined && merchandiseAvailable> 0){
                    if(merchandiseAvailable>merchandiseRequired){
                        //Calculate merchandise taken 
                        merchandiseTaken= merchandiseAvailable-merchandiseRequired;
                        //add updated amount of merchandise at warehouse 
                        warehouse[indexLocation].warehouseInventory[warehouseName] = merchandiseAvailable-merchandiseRequired;
                        //reset merchandise required 
                        merchandiseRequired=0;
                    }else{
                        //resetting 
                        warehouse[indexLocation].warehouseInventory[warehouseName] =0
                        //take what merchandise is there
                        merchandiseTaken = merchandiseAvailable
                        //Updating amount at warehouse 
                        merchandiseRequired-=merchandiseAvailable
                    }
                    //this will update merchandise found as we found merchandise we needed 
                    merchandiseFound[warehouseName] ={[chosenMerchandise]:merchandiseTaken};
                }
                indexLocation++ //updating indexLocation
            }
            // let countTwo =0;
            // for(var j in merchandise){
            //     countTwo++
            // }
            //this condition checks to make sure we found an acceptable amount of merchandise required before we update the outcome 
            if(Object.keys(merchandiseFound).length > 0 && merchandiseRequired === 0){
                outcome.push(merchandiseFound) //updates outcome array
            }
        }
        //returns final results
        
        return outcome
    }


 }; module.exports.AllocationTool = AllocationTool