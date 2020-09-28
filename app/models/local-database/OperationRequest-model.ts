// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineOperationData;
export default class OperationRequestModel extends Model {
  static table = "Operations";

  static associations = {
    imexUser: { type: "belongs_to", key: "CBOSID" },
  };

  @field("ImportPurpose") ImportPurpose;
  @field("ExporterName") ExporterName;
  @field("ExporterCountry") ExporterCountry;
  @field("DocArrivalDate") DocArrivalDate;
  @field("ArrivalPort") ArrivalPort;
  @field("TotalValue") TotalValue;
  @field("Currency") Currency;
  @field("Bank") Bank;
  @field("BankBranch") BankBranch;
  @field("CBOSID") CBOSID;
  @field("Notes") Notes;
  @field("LoginName") LoginName;
 
  @relation("imexUser", "imexUser_id") imexUser;

  async getSavedOperation( LoginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const OperationOfflined = database.collections.get("Operations");
        offlineOperationData = await OperationOfflined
          .query(Q.where("LoginName", LoginName))
          .fetch();
        if (
            offlineOperationData.length > 0 &&
            offlineOperationData[0].LoginName===LoginName
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineOperation(LoginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const OperationOfflined = database.collections.get("Operations");
        offlineOperationData = await OperationOfflined
          .query(Q.where("LoginName", LoginName))
          .fetch();
        return offlineOperationData[0];
      },
    );
  }

  async getAllSavedOperation(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const OperationOfflined = database.collections.get("Operations");
        const offlineOperation = await OperationOfflined.query().fetch();
        return offlineOperation;
      },
    );
  }

  async addAndUpdateRecordOffline(isOperationSaved, offlineData, imexUserObj): Promise<boolean> {
    return database.action(async () => {
      const OperationOfflined = database.collections.get("Operations");
      if (isOperationSaved) {
        const record = await OperationOfflined.find(offlineOperationData[0].id);
        record.update(update => {
          this.addData(update, offlineData, imexUserObj);
          showAlert("", "OperationSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await OperationOfflined.create(create => {
          this.addData(create, offlineData, imexUserObj);
          showAlert("", "OperationSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteOperation(id): Promise<boolean> {
    return database.action(async () => {
      const OperationSuccess = database.collections.get("Operation");
      const record = await OperationSuccess.find(id);
      record.destroyPermanently();
    });
  }


  addData(record, offlineData, imexUserObj) {
    record.OperationDesc = offlineData.OperationDesc;
    record.formNo = offlineData.formNo;
    record.type = offlineData.type;
    record.loginName = offlineData.loginName;
    record.imexUser.set(imexUserObj);
  }
}
