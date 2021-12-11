//########################################################
// 1. 创建对象的几种方式
//########################################################
var object = {}; // 对象字面量

function Person(){} // 原型模式
Person.prototype.name = "Sudheer";
var object = new Person();


var object = new function(){ // 单例模式
   this.name = "Sudheer";
}

//########################################################
// 2. 什么是原型链
//########################################################
// 原型链是基于已存在的对象构建新的类型，类似OOP的继承
// Object.getPrototypeOf(object) 和 Object.__proto__ 可以获取对象的原型
// Employee.__proto__ -> Person.__proto__ -> Object.__proto__ -> null

//########################################################
// 3. call, apply, bind 的不同之处
//########################################################
// call 和 apply 会将函数的this指向改为第一个参数，call 接收 rest 参数，apply 接收数组参数
// bind 返回this指向指定参数的新函数 
var employee1 = {firstName: 'John', lastName: 'Rodson'};
var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};

function invite(greeting1, greeting2) {
    console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
}
invite.call(employee1, 'Hello', 'How are you?'); // Hello John Rodson, How are you?
invite.call(employee2, 'Hello', 'How are you?'); // Hello Jimmy Baily, How are you?
invite.apply(employee1, ['Hello', 'How are you?']); // Hello John Rodson, How are you?
invite.apply(employee2, ['Hello', 'How are you?']); // Hello Jimmy Baily, How are you?

var inviteEmployee1 = invite.bind(employee1);
var inviteEmployee2 = invite.bind(employee2);
inviteEmployee1('Hello', 'How are you?'); // Hello John Rodson, How are you?
inviteEmployee2('Hello', 'How are you?'); // Hello Jimmy Baily, How are you?