 

import levelup from 'levelup';
import leveldown from 'leveldown';
import leveljs from 'level-js';
// 1) Create our store
var db = levelup(leveldown('./db'))

// 2) Put a key & value



 
 db.get('pill_num_key', function (err, value) {
    if (err){
       db.put('pill_num_key', 0 , function (err) {
      
        last_selling_bill_no = 0;
    //  console.log('in',basic_nums)
    });
    }
      else{
    last_selling_bill_no = parseInt(value);
 

}
    console.log('out', last_selling_bill_no);
  })