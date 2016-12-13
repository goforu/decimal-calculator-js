# decimal-calculator-js
A lib to prevent the loss of precision when involved in js decimal calculation
##Usage
```javascript
MathDecimal.calc(0.1, 0.2, '+');// 0.3
MathDecimal.calc(0.2, 0.11, '-');// 0.09
MathDecimal.calc(0.11, 0.1, '*');//0.011

MathDecimal.calcAll([0.1, 0.2, 0.7], '+');//1
```
