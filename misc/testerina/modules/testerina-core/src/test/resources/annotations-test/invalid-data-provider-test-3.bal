import ballerina/test;
import ballerina/io;

@test:config{
    dataProvider:"invalidDataGen"
}
function testFunc2 (string fValue, string sValue, string result) {

    var value1 =? <int>fValue;
    var value2 =? <int>sValue;
    var result1 =? <int>result;
    io:println("Input params: ["+fValue+","+sValue+","+result+"]");
    test:assertEquals(value1 + value2, result1, msg = "The sum is not correct");
}

function invalidDataGen() returns (string) {
    return "hi";
}
