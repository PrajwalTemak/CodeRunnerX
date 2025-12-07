import { User } from "../models/user.model.js";

export const registerUser = async (req,res)=>{
    try {
        const { username, email, password } = req.body;
        //basic validation
        if( !username || !password || !email)
        {
            return res.status(400).json({message:"All thee fields are required !"});
        }
        // check if user exists already ! 
        const existing = await User.findOne({email : email.toLowerCase() })
        if(existing)
        {
             return res.status(400).json({message:"User already exists !"});
        }

        // All ok
        const user = await User.create(
            {
                username,
                email: email.toLowerCase(),
                password,
                loggedIn: false
            }
        );

        res.status(201).json({message:"User registered !",
            user : {id: user._id, email:user.email, username: user.username}
        })

    } catch (error) {
        res.status(500).json({message:"Internal Server Error !!! ",error:error.message})
    }
}

export const loginUser = async (req,res)=>{
    try {
        //checking is user alrady exists !
        const {email,password}=req.body;
        const user = await User.findOne({
            email:email.toLowerCase(),

        });

        if(!user)
        {
            return res.status(400).json({
                message:"user nt found !!!"
            });
        }

        //compare passwrd ! 
        const isMatch = await user.comparePassword(password);
        if(!isMatch)
        {
            return res.status(400).json(
                {
                    message:"Invalid Credntials !"
                }
            )
        }

        res.status(200).json(
            {
                message:"succesful login !!!",
                user :{
                    id:user._id,
                    email:user.email,
                    username:user.username
                }
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                message:"Internal Server Error !!!123"
            }   
        )   
    }
}

export const logoutUser = async (req,res)=>{
    try {
        
        const {email} = req.body;
        const user = User.findOne({
            email
        })
        if(!user) return res.status(404).json({
            message:"User not found !!!"
        });

        res.status(200).json({
            message:"Logout Succesful !!!"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error !!!",error   
        })
    }

}

