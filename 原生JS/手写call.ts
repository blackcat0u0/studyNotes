interface Function {
  mycall(ctx: any, ...args: any): void;
}

Function.prototype.mycall = function (ctx, ...args) {
  ctx = (ctx === null || ctx=== undefined) ? globalThis : Object(ctx)
  var key = Symbol('temp');
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: this
  })
  var result = ctx[key](...args);
  delete ctx.key;
  return result;
}

// 测试
function method(a, b) {
  console.log(this, a, b);
  
  return a + b
}
method.mycall(null, 2, 3)