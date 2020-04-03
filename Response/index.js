class Vue {
  // Get vue's parameter ==>  Currently only data is processed
  constructor(options) {
    var _opt = options || {}
    var data = this._data = _opt.data
    // watch events
    obsever(data)
  }
}


function obsever(val) {
  if(!val || (typeof(val) !== 'object')) {
    return
  }
  Object.keys(val).forEach((key)=>{
    defineReactive(val,key,val[key]) 
  })
}

function defineReactive(obj,key,val) {
  Object.defineProperty(obj,key,{
    enumerable:true,
    configurable:true,
    get: function getter() {
      return val
    },
    set:function setter(newVal) {
      if(val === newVal) { return  }
      //cb fn
      val = newVal
      notice(val)
    }
  })
}


function notice(val) {
  console.log(val,"I get info what i want ")
}

// Example
var example = new Vue({
  data:{
    txt:'this is nothing'
  }
})

example._data.txt = 'I English is SB'