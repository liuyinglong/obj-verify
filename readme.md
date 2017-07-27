### 对象验证

```js
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
```