function Spinner(){
    var count = 0;
    if (this instanceof Spinner){
        this.up = function(){
            return ++count;
        };
        this.down = function(){
            return --count;
        };
    } else {
        return "something";
    }
}
