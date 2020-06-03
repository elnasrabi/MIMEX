// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb"
import { field, relation } from "@nozbe/watermelondb/decorators"
import { database } from "../../app"
import { showAlert } from "../../utils/utils"

let offlineConsignment
export default class ConsignmentModel extends Model {
  static table = "consignment";

  // static associations = {
  //   user: { type: "belongs_to", key: "login_name" }
  // }

  @field("customer_name") customerName;
  @field("event_name") eventName;
  // @field("login_name") loginName;
  @field("event_notes") eventNotes;
  @field("consignment_number") consignmentNumber;
  @field("items_count") itemsCount;
  @field("status") status;
  @field("image") image;
  @field("sign_by") signBy;
  @field("sign_image") signImage;
  @field("event_date") date;
  @field("synced") synced;
  @relation('user', 'login_name') loginName

  async getSavedConsignment(consignmentNumber, loginName): Promise<boolean> {
    return await database.action(async (): Promise<boolean> => {
      const consignmentSuccess = database.collections.get("consignment")
      offlineConsignment = await consignmentSuccess.query(Q.where("consignment_number", consignmentNumber),
        Q.where("login_name", loginName)).fetch()
      if (offlineConsignment.length > 0 && offlineConsignment[0].consignmentNumber === consignmentNumber) {
        console.log(offlineConsignment)
        return true
      }
      return false
    })
  }

  async addAndUpdateRecordOffline(isConsignmentSaved, offlineData) {
    database.action(async () => {
      const consignmentSuccess = database.collections.get("consignment")
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
