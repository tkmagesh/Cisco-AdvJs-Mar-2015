define(['SalaryCalculator','jquery'], function(SalaryCalculator, $){
    function SalaryCalculatorView(){
        this.init = function(){
            var calculator = new SalaryCalculator();
            $("#rangeTax").change(function(){
                $("#spanTax").text(this.value + '%');
            });
            $("#btnCalculate").click(function(){
                calculator.basic = $("#txtBasic").val().toInt();
                calculator.hra = $("#txtHra").val().toInt();
                calculator.da = $("#txtDa").val().toInt();
                calculator.tax = $("#rangeTax").val().toInt();

                calculator.calculate();

                $("#divResult").html(calculator.salary).hide().fadeIn(300);
            });
        }
        
    }
    return SalaryCalculatorView;
});