
User = require("../model/user-model")

const Home = (req, res) =>{
    res.status(200).json({message : "Hi, Your are now at home"});
}

const Register = async(req, res, next) =>{
    try{
       const {username, email, phone, password} = req.body;
       const userExist = await User.findOne({email});
       if(userExist)
       {
        const status = 400;
        const message = "Invalid email address";

        const error = {
          status,
          message,
        };

        next(error);
       } else{
          const UserCreated = await User.create({username, email, phone, password});
          res.status(201).json({
            message: "Registration Successful",
            token : await UserCreated.generateToken(),
            userId: UserCreated._id.toString(),
        });
       }

    } catch(err)
    {
        const status = 500;
        const message = "Internal server error";

        const error = {
          status,
          message,
        };

         next(error);
    }
}

const LogIn = async(req, res, next) =>{
    try{
       const {email, password} = req.body;
       const userExist = await User.findOne({email});

       if(!userExist)
       {
        const status = 400;
        const message = "Invalid Credentials";

        const error = {
          status, 
          message,
        }
        next(error);
       }

       const isPasswordValid = await userExist.comparePassword(password);

       if(isPasswordValid)
       {
         res.status(200).json({
            message: "Login Successful",
            token : await userExist.generateToken(),
            userId : userExist._id.toString(),
        })
       } else{

          const status = 400;
          const message = "Invalid email or password";

          const error = {
            status,
            message,
          };
          next(error);
       }
    } catch(err)
    {
      const status = 500;
      const message = "Internal server error";

      const error = {
         status,
         message,
      };

      next(error);
    }
} 

module.exports = {Home, Register, LogIn};