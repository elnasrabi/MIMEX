// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineConsignment;
export default class ConsignmentModel extends Model {
  static table = "consignment";

  static associations = {
    user: { type: "belongs_to", key: "user_id" },
  };

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
  @field("date") date;
  @field("synced") synced;
  @relation("user", "user_id") user;

  async getSavedConsignment(consignmentNumber, loginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const consignmentSuccess = database.collections.get("consignment");
        offlineConsignment = await consignmentSuccess
          .query(Q.where("consignment_number", consignmentNumber))
          .fetch();
        if (
          offlineConsignment.length > 0 &&
          offlineConsignment[0].consignmentNumber === consignmentNumber
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineConsignment(consignmentNumber, loginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const consignmentSuccess = database.collections.get("consignment");
        offlineConsignment = await consignmentSuccess
          .query(Q.where("consignment_number", consignmentNumber))
          .fetch();
        return offlineConsignment[0];
      },
    );
  }

  async getAllSavedConsignment(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const consignmentSuccess = database.collections.get("consignment");
        const offlineConsignment = await consignmentSuccess.query().fetch();
        return offlineConsignment;
      },
    );
  }

  async addAndUpdateRecordOffline(isConsignmentSaved, offlineData, userObj): Promise<boolean> {
    return database.action(async () => {
      const consignmentSuccess = database.collections.get("consignment");
      console.log(offlineData);
      if (isConsignmentSaved) {
        const record = await consignmentSuccess.find(offlineConsignment[0].id);
        record.update(update => {
          this.addData(update, offlineData, userObj);
          showAlert("", "consignmentSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await consignmentSuccess.create(create => {
          this.addData(create, offlineData, userObj);
          showAlert("", "consignmentSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteConsignment(id): Promise<boolean> {
    return database.action(async () => {
      const consignmentSuccess = database.collections.get("consignment");
      const record = await consignmentSuccess.find(id);
      record.destroyPermanently();
    });
  }

  addData(record, offlineData, userObj) {
    record.customerName = offlineData.customerName;
    record.userName = offlineData.userName;
    record.consignmentNumber = offlineData.consignmentNumber;
    record.itemsCount = offlineData.itemsCount;
    record.status = offlineData.status;
    record.eventName = offlineData.type;
    record.eventNotes = offlineData.eventNotes;
    record.image = offlineData.image;
    record.signBy = offlineData.signBy;
    record.signImage = offlineData.signImage;
    record.date = offlineData.date;
    record.synced = offlineData.synced;
    record.user.set(userObj);
  }
}
