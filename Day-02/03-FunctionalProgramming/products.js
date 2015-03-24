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
    console.table(products);
});

