var products = [
    {id : 6, name: "Hen", cost : 80, units : 60, category : 2},
    {id : 8, name: "Ten", cost : 50, units : 80, category : 1},
    {id : 5, name: "Den", cost : 90, units : 40, category : 2},
    {id : 9, name: "Len", cost : 60, units : 50, category : 1},
    {id : 4, name: "Ken", cost : 70, units : 90, category : 2},
    {id : 3, name: "Pen", cost : 40, units : 20, category : 1}
];

function print(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

print("Default List", function(){
    console.table(products);
});

print("Sort", function(){
    print("Default [products by id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j = i+1; j<products.length; j++){
                    var left = products[i],
                        right = products[j];
                    if (left.id > right.id){
                        products[i] = products[j];
                        products[j] = left;
                    }
                }
        }
        sort();
        console.table(products);
    });
    print("Generic Sort [Any list by any attribute]", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j = i+1; j<list.length; j++){
                    var left = list[i],
                        right = list[j];
                    if (left[attrName] > right[attrName]){
                        list[i] = list[j];
                        list[j] = left;
                    }
                }
        }
        print("Products sorted by name", function(){
            sort(products, "name");
            console.table(products);
        });
        print("Products sorted by cost", function(){
            sort(products, "cost");
            console.table(products);
        });
    });
    print("Generic Sort [Any list by any logic]", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j = i+1; j<list.length; j++){
                    var left = list[i],
                        right = list[j];
                    if (comparerFn(left, right) > 0 ){
                        list[i] = list[j];
                        list[j] = left;
                    }
                }
        }
        print("Products sorted by value [ cost * units ]", function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productComparerByValue);
            console.table(products);
        });

    });
});

//filter
print("Filter", function(){
    function filter(list, criteriaFn){
        var result = [];
        for(var i=0; i< list.length; i++)
            if (criteriaFn(list[i]))
                result.push(list[i]);
        return result;
    }
    function inverse(originalCriteria){
        return function(){
            return !originalCriteria.apply(this,arguments);
        }
    }
    var costlyProductCriteria = function(product){
        return product.cost > 50;
    };
    /*var affordableProductCriteria = function(product){
        //return product.cost <= 50;
        return !costlyProductCriteria(product);

    };*/
    var affordableProductCriteria = inverse(costlyProductCriteria);

    print("All costly products", function(){

        var costlyProducts = filter(products,costlyProductCriteria);
        console.table(costlyProducts);
    });
    print("All affordable products", function(){
        var affordableProducts = filter(products, affordableProductCriteria);
        console.table(affordableProducts);
    });
    print("All category - 1 products", function(){
        var Category1ProductCriteria = function(product){
            return product.category === 1;
        }
        var category1Products = filter(products,Category1ProductCriteria);
        console.table(category1Products);
    });
});
//every
print("Every", function(){
    function every(list, predicateFn){
        for(var i=0; i<list.length; i++)
            if (!predicateFn(list[i]))
                return false;
        return true;
    }
    var costlyProductCriteria = function(product){
        return product.cost > 50;
    };
    var areAllProductsCostly = every(products, costlyProductCriteria);
    console.log("Are all products costly?", areAllProductsCostly);
});
//some
print("Some", function(){
    function some(list, predicateFn){
        for(var i=0; i<list.length; i++)
            if (predicateFn(list[i]))
                return true;
        return false;
    }
    var costlyProductCriteria = function(product){
        return product.cost > 50;
    };
    var areThereAnyCostlyProducts = some(products, costlyProductCriteria);
    console.log("Are there any costly products?", areThereAnyCostlyProducts);
});
//min
print("Min", function(){
    function min(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i=1; i<list.length; i++){
            var currentValue = valueSelector(list[i]);
            if (result > currentValue)
                result = currentValue;
        }
        return result;
    }
    var costSelector = function(p){
        return p.cost;
    }
    var minCost = min(products, costSelector);
    console.log("Minimum Cost = ", minCost);
});
//max

//sum

//aggregate
print("Aggregate", function(){
    function aggregate(list, aggregatorFn, seed){
        var result = seed;
        for(var i=0; i<list.length; i++){
            result = aggregatorFn(result, list[i]);
        }
        return result;
    };
    var unitsAggregator = function(prevResult, product){
        return prevResult + product.units;
    }
    var sumOfUnits = aggregate(products, unitsAggregator, 0);
    console.log("Sum of units = ", sumOfUnits);

    var minCostAggregator = function(prevResult, product){
        return prevResult < product.cost ? prevResult : product.cost;
    };
    var minOfCost = aggregate(products, minCostAggregator, products[0].cost);
    console.log("Min cost = ", minOfCost);
});

//groupBy
print("Group By", function(){
   function groupBy(list, keySelectorFn){
       var result = {};
       for(var i = 0; i<list.length; i++){
           var key = keySelectorFn(list[i]);
           if (typeof result[key] === "undefined")
               result[key] = [];
           result[key].push(list[i]);
       }
       return result;
   }
    var categoryKeySelector = function(product){
        return product.category;
    };
    var productsGroupedByCategory = groupBy(products, categoryKeySelector);
    console.log(productsGroupedByCategory);

    var costBasedKeySelector = function(product){
        return product.cost > 50 ? "costly" : "affordable";
    }
    var productsGroupedByCost = groupBy(products, costBasedKeySelector);
    print("Grouped By Cost", function(){
        for(var key in productsGroupedByCost){
            print("Key = " + key, function(){
                console.table(productsGroupedByCost[key]);
            });
        }
    });
});



