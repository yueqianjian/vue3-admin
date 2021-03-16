let demo = new Proxy({},{
  set(obj,prop,value){
    console.log(11111)
    console.log(obj,prop,value)
    console.log(2222)
    obj[prop] = value
  },
  has(obj,prop){
    console.log(11111)
    console.log(obj,prop)
    console.log(2222)
  }
})