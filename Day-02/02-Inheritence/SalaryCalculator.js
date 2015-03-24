function SalaryCalculator(basic, hra, da, tax){
    //this.basic = basic;
    this.hra = hra;
    this.da = da;
    this.tax = tax;
    this.salary = 0;

    var _basic = basic;

    /*this.getBasic = function(){
        return _basic;
    };
    this.setBasic = function(value){
        //do the validation on value
        _basic = value;
    };*/
    this.basic = function(value){
        if (arguments.length === 0) return _basic;
        //do the validation on value;
        _basic = value;
    }
}
SalaryCalculator.prototype.calculate = function(){
        var gross = this.basic + this.hra + this.da;
        this.salary = gross * ((100-this.tax)/100);
    }
