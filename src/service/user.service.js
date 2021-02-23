import models from "../database/models/index";
const { Users } = models;
export default class UserService {
    static async retrieveUserById(userid) {
        const data = await Users.findOne({
          where: { id: userid },
          attributes: { exclude: "password" },
        });
        return data;
      }



      //User update

      static async upDateUserInfo(updates, id) {
        let userNameCheck, colsAffected;
        if (updates.username) {
          userNameCheck = await Users.findAll({
            where: { username: updates.username },
          });
        }
    
        if (
          userNameCheck == undefined
          || userNameCheck.length == 0
          || (userNameCheck.length == 1 && userNameCheck[0].id == id)
        ) {
          colsAffected = await Users.update(updates, {
            where: { id },
            attributes: { exclude: "email" },
          });
          if (colsAffected[0] != 0) {
            return true;
          }
          return false;
        }
        return "Username has been taken";
      }
    

}

