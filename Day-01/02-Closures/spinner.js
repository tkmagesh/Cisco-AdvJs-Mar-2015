//create an object "spinner"

function getSpinner(){
    var count = 0;
    function increment(){
        return ++count;
    }
    function decrement(){
        return --count;
    }
    var obj = {
        up : increment,
        down : decrement
    };
    return obj;
}
var spinner = getSpinner();

//"spinner" should exhibit the following behavior

spinner.up() => 1
spinner.up() => 2
spinner.up() => 3
spinner.up() => 4

spinner.down() => 3
spinner.down() => 2
spinner.down() => 1
spinner.down() => 0
spinner.down() => -1

