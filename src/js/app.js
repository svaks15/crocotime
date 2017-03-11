var App = {

    rangeOneSum: 100,
    rangeTwoSum: 5,
    totalSum: 0,

    init: function(){
        App.calcTotalSum()

        $("#range").ionRangeSlider({
            min: 0,
            max: 300,
            from: 100,
            onChange: function (data) {
                $('#rangeValue').html(data.from);
                App.rangeOneSum = data.from
                App.calcTotalSum()
            },
        });

        $("#range_two").ionRangeSlider({
            min: 0,
            max: 15,
            from: 5,
            onChange: function (data) {
                $('#rangeValueTwo').html(data.from);
                App.rangeTwoSum = data.from
                App.calcTotalSum()
            },
        });

    },
    calcTotalSum: function(){
        this.totalSum = this.rangeOneSum * 8500 + this.rangeTwoSum * 30000;
        var a = '' + this.totalSum
        var b = a.replace(new RegExp("^(\\d{" + (a.length%3?a.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim()
        $('#rangeResult').html(b)
    }



}



$(function(){
    App.init()

});