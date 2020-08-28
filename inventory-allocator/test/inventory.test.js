/**
 * Library/Tools: Javascript, Mocha, Chai, Node.JS
 * Author: John Hill 
 * Created: August 26th, 2020
 * 
 * Description: This file(inventory.test.js) contains unit tests, function tests and fail tests
 * 
 **/


 //importing allocation tool and chai
 const {AllocationTool}= require("../src/Allocation_Tool");
 const expect = require('chai').expect;

 //defining new allocator 
 let allocator = new AllocationTool;
 //defining fake warehouses
 //merch1-6 warehouses 1-7
 let fakeWarehouses = [
     {name: "wh1", warehouseInventory:{merch1:4 , merch2: 2}},
     {name: "wh2", warehouseInventory:{merch1: 2, merch3: 2 }},
     {name: "wh3", warehouseInventory:{merch4: 2, merch2: 2 }},
     {name: "wh4", warehouseInventory:{merch5: 8, merch6: 5 }},
     {name: "wh5", warehouseInventory:{merch4: 4, merch7: 3 }},
 
 ]
 
 //console log run times 
 let test_no = 1;

 describe( " Test inventory  " , () => {

    describe( " searching for solutions " , () => {

        it( " Should return an array of objects  " , ( done ) => {
    
            let fakeMerch = { merch1: 4, merch3: 2, merch4: 2 };
            let expectedOutcome = [
                { wh1: { merch1: 4 } },
                { wh2: { merch3: 2 } },
                { wh3: { merch4: 2 } }
              ];
            let outcome = allocator.getBestPrice( fakeMerch, fakeWarehouses );

            expect( outcome.length ).to.equal( 3 );
            expect( JSON.stringify( outcome )).to.equal( JSON.stringify( expectedOutcome ));
            
            done();           
        });

        it( " Should return an array of objects " , ( done ) => {
    
            let fakeMerch = { merch1: 5, merch4: 6, merch2: 4 };
            let expectedOutcome = [
                { wh1: { merch1: 4 }, wh2: { merch1: 1 } },
                { wh3: { merch4: 2 }, wh5: { merch4: 4 } },
                { wh1: { merch2: 2 }, wh3: { merch2: 2 } }
              ];
            let outcome = allocator.getBestPrice( fakeMerch, fakeWarehouses );

            expect( outcome.length ).to.equal( 3 );
            expect( JSON.stringify( outcome )).to.equal( JSON.stringify( expectedOutcome ));
            
            done();           
        });

        it( " Should return an array of objects " , ( done ) => {

            let fakeMerch = { merch1: 5, merch4: 6, merch2: 5, merch21: 2 };
            let expectedOutcome = [
                { wh1: { merch1: 4 }, wh2: { merch1: 1 } },
                { wh3: { merch4: 2 }, wh5: { merch4: 4 } }
              ];
            let outcome = allocator.getBestPrice( fakeMerch, expectedOutcome );

            expect( outcome.length ).to.equal( 2 );
            expect( JSON.stringify( outcome )).to.equal( JSON.stringify( expectedOutcome ));
            
            done();           
        });
    });

    describe( " looking for errors " , () => {

        it( " should be null array " , ( done ) => {
    
            let fakeMerch = { merch1: 7, merch3: 3, merch4: 10 };
            let outcome = allocator.getBestPrice( fakeMerch, fakeWarehouses );

            expect( outcome.length ).to.equal( 0 );
            

 
        });

        it( " Should be null array " , ( done ) => {
    
            let fakeMerch = { merch123: 4, merch212: 2, merch8273: 2 };
            let outcome = allocator.getBestPrice( fakeMerch, fakeWarehouses );

            expect( outcome.length ).to.equal( 0 );
           
        });

        it( " Should return null array " , ( done ) => {
             
            let fakeMerch = { };
            let outcome = allocator.getBestPrice( fakeMerch, fakeWarehouses );

            expect( outcome.length ).to.equal( 0 );
            
        
            console.log("RESULTS TEST " + test_no);
            console.log(outcome);
            test_no++;
            
            done();           
        });

        it( " Should return null " , ( done ) => {
    
            let fakeMerch = { merch1: 4, merch3: 2, merch4: 2 };
            let nullWarehouse = [];
            let outcome = allocator.getBestPrice( fakeMerch, nullWarehouse );

            expect( outcome.length ).to.equal( 0 );
            
         
        });
    })
})