require(['jquery','SalaryCalculatorView','utils'], function($, SalaryCalculatorView){
    $(function(){
            var view = new SalaryCalculatorView();
            view.init();
        });
});