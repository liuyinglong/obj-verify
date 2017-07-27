/**
 * Created by focus on 2017/7/26.
 */


let defaultRules = require("./defaultRules");

function is(type, val) {
    return Object.prototype.toString.call(val) === ("[object " + type + "]")
}

let Verify = function (option) {
    this.rules = Object.assign(defaultRules, option && option.rules ? option.rules : {});
};

Verify.prototype = {
    validate: function (value, rule) {
        let self = this;
        

        
        // 为字符串时调用默认规则
        if (is("String", rule)) {
            rule = defaultRules[rule];
        }
        
        
        //如果验证规则不存在 结束
        if (!(rule && (rule.test || rule.maxLength || rule.minLength))) {
            console.warn("rule of " + value + " not define");
            return false;
        }
        
        
        let valid = true;
        if (rule && rule.test) {
            //验证数据
            valid = is("Function", rule.test) ? rule.test.call(this, value) : rule.test.test(value);
        }
        
        if (rule && rule.maxLength) {
            if (value.length > rule.maxLength) {
                valid = false;
                if (!rule.message) {
                    rule.message = "至多" + rule.maxLength + "个字符";
                }
            }
        }
        
        if (rule && rule.minLength) {
            if (value.length < rule.minLength) {
                valid = false;
                if (!rule.message) {
                    rule.message = "至少" + rule.minLength + "个字符";
                }
            }
        }
        
        if (!valid) {
            return rule.message;
        }
    },
    check: function (data, rules) {
        let validate = {};
        let self = this;
        for (let k in data) {
            let rule = rules[k];
            if (rule) {
                if (Array.isArray(rule)) {
                    validate[k] = [];
                    for (let i = 0; i < rule.length; i++) {
                        let temp = self.validate(data[k], rule[i]);
                        if (temp) {
                            validate[k].push(temp);
                        }
                    }
                } else {
                    validate[k] = this.validate(data[k], rule);
                }
            }
        }
        return validate;
    }
};

module.exports = Verify;