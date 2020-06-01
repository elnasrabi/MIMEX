// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb"
import { field } from "@nozbe/watermelondb/decorators"
import { database } from "../../app"

let offlineConsignment
export default class UserDataModel extends Model {
  static table = "userData";

  @field("email") email;
  @field("firstName") firstName;
  @field("lastName") lastName;
  @field("loginName") loginName;
  @field("passwordUpdated") passwordUpdated;
  @field("userTypeName") userTypeName;

  async getUserData(loginName): Promise<any> {
    return await database.action(async (): Promise<boolean> => {
      const consignmentSuccess = database.collections.get("userData")
      offlineConsignment = await consignmentSuccess.query(Q.where("loginName", loginName)).fetch()
      return offlineConsignment
    })
  }

  async addUserData(isUserSaved, offlineData) {
    database.action(async () => {
      const userTable = database.collections.get("userData")
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
