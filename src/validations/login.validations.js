export default async (req, res, next) => {
    const { fullname, email, username, password} = req.body;
    if(!email){
        return res.status(400).send({error: "Email is required"});
    }
    
    if(!password){
        return res.status(400).send({error: "Password is required"});
    }

    if(password.length <=5 || password.length >=16){
        return res.status(400).send({error: "Password must be in the range of 6 to 15 characters"});
    }
   
  
    next();
    }