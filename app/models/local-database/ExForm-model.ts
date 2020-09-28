// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineExFormData;
export default class ExFormModel extends Model {
  static table = "ExForms";

  static associations = {
    imexUser: { type: "belongs_to", key: "imexUser_id" },
  };

  @field("customer_name") customerName;
  @field("contract_no") contractNo;
  @field("form_no") formNo;
  @field("total_amount") TotalValue;
  @field("CurrencyShortName") CurrencyShortName;
  @field("country") country;
  @field("cbos_id") CBOSId;
  @field("form_date") formDate;
  @field("bank_name") bankName;
  @field("bank_branch") bankBranch;
  @field("form_status") status;
  @field("custom_unit") customUnit;
  @field("first_approval") firstApproval;
  @field("second_approval") secondApproval;
  @field("date") date;
  @field("synced") synced;
  @relation("imexUser", "imexUser_id") imexUser;

  async getSavedExForm(formNo, loginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const ExFormSuccess = database.collections.get("ExForms");
        offlineExFormData = await ExFormSuccess
          .query(Q.where("form_no", formNo))
          .fetch();
        if (
            offlineExFormData.length > 0 &&
            offlineExFormData[0].form_no === formNo
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineExForm(formNo, loginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const ExFormSuccess = database.collections.get("ExForms");
        offlineExFormData = await ExFormSuccess
          .query(Q.where("form_no", formNo))
          .fetch();
        return offlineExFormData[0];
      },
    );
  }

  async getAllSavedExForm(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const ExFormSuccess = database.collections.get("ExForms");
        const offlineExForm = await ExFormSuccess.query().fetch();
        return offlineExForm;
      },
    );
  }

  async addAndUpdateRecordOffline(isExFormSaved, offlineData, imexUserObj): Promise<boolean> {
    return database.action(async () => {
      const ExFormSuccess = database.collections.get("ExForms");
      if (isExFormSaved) {
        const record = await ExFormSuccess.find(offlineExFormData[0].id);
        record.update(update => {
          this.addData(update, offlineData, imexUserObj);
          showAlert("", "ExFormSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await ExFormSuccess.create(create => {
          this.addData(create, offlineData, imexUserObj);
          showAlert("", "ExFormSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteExForm(id): Promise<boolean> {
    return database.action(async () => {
      const ExFormSuccess = database.collections.get("ExForm");
      const record = await ExFormSuccess.find(id);
      record.destroyPermanently();
    });
  }


  addData(record, offlineData, imexUserObj) {
    record.customerName = offlineData.customerName;
    record.contractNo = offlineData.contractNo;
    record.formNo = offlineData.formNo;
    record.TotalValue = offlineData.TotalValue;
    record.CurrencyShortName = offlineData.CurrencyShortName;
    record.country = offlineData.country;
    record.CBOSId = offlineData.CBOSId;
    record.bankName = offlineData.bankName;
    record.bankBranch = offlineData.bankBranch;
    record.status = offlineData.status;
    record.customUnit = offlineData.customUnit;
    record.firstApproval = offlineData.firstApproval;
    record.secondApproval = offlineData.secondApproval;
    record.date = offlineData.date;
    record.synced = offlineData.synced;
    record.imexUser.set(imexUserObj);
  }
}
