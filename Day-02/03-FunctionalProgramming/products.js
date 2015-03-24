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

//every

//some

//min

//max

//sum

//aggregate

//groupBy



