const obj = {}
let data

Object.defineProperty(obj, 'hello', {
    get() {
        return data['hello']
    },
    set(value) {
        data['hello'] = value
    }
})

data = {}

obj.hello = 'hey'

console.log(obj.hello)