const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true,
    },

    email : {
      type : String,
      required : true, 
    },

    phone : {
      type : String,
      required : true,
    },

    password : {
      type : String,
      required : true,
    }
});

// Hashing of password with bcryptjs 

userSchema.pre("save", async function(next){

    const user = this;
    if(!user.isModified("password"))
    {
      next();
    }
    try{
       const saltRound = await bcrypt.genSalt(10);
       const hash_password = await bcrypt.hash(user.password, saltRound);
       user.password = hash_password;
    }catch(err)
    {
      const status = 500;
      const message = "Failed to make hash password";

      const error = {
        status,
        message,
      };
      next(error);
    }
});

// JWT Authentication and Authorization

const jwt = require("jsonwebtoken");

userSchema.methods.generateToken = function(next){
try{

  // JWT Header
  return jwt.sign({

    // payload 
    userId : this._id.toString(),
    username: this.username,
    email: this.email,
    phone: this.phone,
    password: this.password,
  },
  // JWT signature
  process.env.JWT_SECRET_KEY,
  {
    expiresIn: "30d",

  });
} catch(err)
{
  const status = 500;
  const message = "Failed to generate token";

  const error = {
    status,
    message,
  };
  next(error);
}
}

// Comparing the password

userSchema.methods.comparePassword = async function(password){
   return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);