// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb"
import { field, children } from "@nozbe/watermelondb/decorators"
import { database } from "../../app"

let offlineConsignment
export default class UserModel extends Model {
  static table = "user";
  static associations = {
    consignments: { type: 'has_many', foreignKey: 'user_id' },
  }

  @field("email") email;
  @field("first_name") firstName;
  @field("last_name") lastName;
  @field("login_name") loginName;
  @field("password_updated") passwordUpdated;
  @field("user_type_name") userTypeName;

  @children("consignments") consignments;

  async getUserData(loginName): Promise<any> {
    return await database.action(async (): Promise<boolean> => {
      const consignmentSuccess = database.collections.get("user")
      offlineConsignment = await consignmentSuccess.query(Q.where("login_name", loginName)).fetch()
      console.log(offlineConsignment)
      return offlineConsignment
    })
  }

  async getConsignment(userObj): Promise<any> {
    return await database.action(async (): Promise<boolean> => {
      const consignments = await userObj.consignments.fetch()
      console.log(consignments)
      return false
    })
  }

  async addUserData(isUserSaved, offlineData) {
    database.action(async () => {
      const userTable = database.collections.get("user")
      if (isUserSaved) {
        const record = await userTable.find(offlineConsignment[0].id)
        record.update(update => {
          this.addData(update, offlineData)
        })
      } else {
        await userTable.create(create => {
          this.addData(create, offlineData)
        })
      }
    })
  }

  addData(record, offlineData) {
    record.email = offlineData[0].email[0]
    record.firstName = offlineData[0].firstName[0]
    record.lastName = offlineData[0].lastName[0]
    record.loginName = offlineData[0].loginName[0]
    record.passwordUpdated = offlineData[0].passwordUpdated[0]
    record.userTypeName = offlineData[0].userTypeName[0]
  }
}
