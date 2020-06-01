// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb"
import { field } from "@nozbe/watermelondb/decorators"
import { database } from "../../app"
import { showAlert } from "../../utils/utils"

let offlineConsignment
export default class ConsignmentSuccessModel extends Model {
  static table = "consignmentSuccess";

  @field("customerName") customerName;
  @field("userName") userName;
  @field("consignmentNumber") consignmentNumber;
  @field("itemsCount") itemsCount;
  @field("status") status;
  @field("image") image;
  @field("signBy") signBy;
  @field("signImage") signImage;
  @field("date") date;
  @field("synced") synced;

  async getSavedConsignment(consignmentNumber, loginName): Promise<boolean> {
    return await database.action(async (): Promise<boolean> => {
      const consignmentSuccess = database.collections.get("consignmentSuccess")
      offlineConsignment = await consignmentSuccess.query(Q.where("consignmentNumber", consignmentNumber),
        Q.where("userName", loginName)).fetch()
      if (offlineConsignment.length > 0 && offlineConsignment[0].consignmentNumber === consignmentNumber) {
        console.log(offlineConsignment)
        return true
      }
      return false
    })
  }

  async addAndUpdateRecordOffline(isConsignmentSaved, offlineData) {
    database.action(async () => {
      const consignmentSuccess = database.collections.get("consignmentSuccess")
      if (isConsignmentSaved) {
        const record = await consignmentSuccess.find(offlineConsignment[0].id)
        record.update(update => {
          this.addData(update, offlineData)
          showAlert("", "consignmentSuccess.offlineDataSaveMessage")
        })
      } else {
        await consignmentSuccess.create(create => {
          this.addData(create, offlineData)
          showAlert("", "consignmentSuccess.offlineDataSaveMessage")
        })
      }
    })
  }

  addData(record, offlineData) {
    record.customerName = offlineData.customerName
    record.userName = offlineData.userName
    record.consignmentNumber = offlineData.consignmentNumber
    record.itemsCount = offlineData.itemsCount
    record.status = offlineData.status
    record.image = offlineData.image
    record.signBy = offlineData.signBy
    record.signImage = offlineData.signImage
    record.date = offlineData.date
    record.synced = offlineData.synced
  }
}
