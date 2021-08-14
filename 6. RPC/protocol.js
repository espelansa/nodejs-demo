const fs = require('fs');
const protobuf = require('protocol-buffers');

const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'));
console.log(schema);

const buffer = schema.Column.encode({
  id: 1,
  name: 'Node',
  price: 80.4
});
console.log(buffer);

console.log(schema.Column.decode(buffer));

/** 
 * <Buffer 08 01 12 04 4e 6f 64 65 1d 00 00 c8 42>
 * { id: 1, name: 'Node', price: 80.4000015258789 }
*/