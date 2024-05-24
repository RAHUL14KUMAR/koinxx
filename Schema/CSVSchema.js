const mongoose = require('mongoose');

const schema=mongoose.Schema;
const cryptoSchema = new schema({
    User_ID:{
        type: String,
        required: true
    },
    UTC_Time: { 
        type: Date, 
        required: true 
    },
    Operation: { 
        type: String, 
        enum: ['Buy', 'Sell'], 
        required: true 
    },
    Opertion_amount: { 
        type: Number, 
        required: true 
    },
    Market:{
        type:String,
        required:true
    },
    BaseCoin: { 
        type: String, 
        required: true 
    },
    QuoteCoin: { 
        type: String, 
        required: true 
    },
    Price: { 
        type: Number, 
        required: true 
    }
  });
  

module.exports=mongoose.model('crypto',cryptoSchema);