import jwtSimple from "jwt-simple"; 

const generateToken = (user)=>{
const accessToken = jwt.encode(user, process.env.ACCESS_SECRET_TOKEN);

if(!accessToken){
return {message: "Oops, something went wrong"};
}
return {token: accessToken}
}

export default generateToken;
