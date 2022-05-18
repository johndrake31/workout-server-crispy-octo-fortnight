import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });


const userAuth = async (jwt:string)=>{
    const varified = jsonwebtoken.verify(jwt, process.env.JWT_SECRET!)
    if(!varified) throw new Error("invalid token");
    if(varified){
        //returns decoded jwt token
        const decodedJwt = jsonwebtoken.decode(jwt);
        return decodedJwt; 
    }
}

export default userAuth;