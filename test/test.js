/**
 * Created by focus on 2017/7/26.
 */

let ObjVerify = require("../src/objVerify");

let objVerify = new ObjVerify();

let rules = {
    phone: ["required","mobile"],
    name: [
        {
            minLength: 15,
            message:"至少15个字符"
        }
    ]
};

let data={
    phone:"1",
    name:"12"
};

console.log(objVerify.check(data,rules));