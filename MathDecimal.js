var MathDecimal = {
    // Convert decimal to an integer array
    _toInteger:function(num) {
        var nums = num + "";
        var match = /\./.exec(nums);
        var placesLen = (match && match.index) ? nums.length - match.index - 1 : 0;
        var inum = +(nums.replace('.', ''));
        while (inum !== 0 && inum/10 % 1 === 0) {
            inum = inum/10;
            placesLen--;
        }
        return [inum, placesLen];
    },
    // Convert integer array back to decimal
    _toDecimal:function(numArr) {
        var nums = (numArr[0] + "");
        // the position of radix point
        var p = nums.length - numArr[1];

        while (p < 1){
            nums = '0' + nums;
            p ++;
        }

        while(p > nums.length){
            nums += '0';
        }
        // integer part
        var ipart = nums.substr(0, p);
        return ( +(ipart + "." + nums.substr(p)))
    },
    calc: function(num1, num2, type){
        var result = [];
        var numA1 = this._toInteger(num1);
        var numA2 = this._toInteger(num2);
        switch (type){
            case '*':
                result[0] = numA1[0] * numA2[0];
                result[1] = numA1[1] + numA2[1];
                break;
            case "+":
                if(numA1[1] > numA2[1]){
                    numA2[0] = numA2[0] * Math.pow(10, numA1[1] - numA2[1]);
                    numA2[1] = numA1[1];
                }else{
                    numA1[0] = numA1[0] * Math.pow(10, numA2[1] - numA1[1]);
                    numA1[1] = numA2[1];
                }
                result[0] = numA1[0] + numA2[0];
                result[1] = numA1[1];
                break;
            case "-":
                return this.calc(num1,-num2, "+");
        }
        return this._toDecimal(result);
    },
    calcAll: function(numArr, type){
        var num = numArr[0];
        for(var i=1; i<numArr.length; i++) {
            num = this.calc(num, numArr[i], type);
        }
        return num;
    }
};