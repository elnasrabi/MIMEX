// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineImFormData;
export default class ImFormModel extends Model {
  static table = "ImForms";

  static associations = {
    imexUser: { type: "belongs_to", key: "imexUser_id" },
  };

  @field("customer_name") customerName;
  @field("operation_no") operationNo;
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

  async getSavedIMForm(formNo, loginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const ImFormSuccess = database.collections.get("ImForms");
        offlineImFormData = await ImFormSuccess
          .query(Q.where("form_no", formNo))
          .fetch();
        if (
            offlineImFormData.length > 0 &&
            offlineImFormData[0].form_no === formNo
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineIMForm(formNo, loginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const ImFormSuccess = database.collections.get("ImForms");
        offlineImFormData = await ImFormSuccess
          .query(Q.where("form_no", formNo))
          .fetch();
        return offlineImFormData[0];
      },
    );
  }

  async getAllSavedImForm(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const ImFormSuccess = database.collections.get("ImForms");
        const offlineImForm = await ImFormSuccess.query().fetch();
        return offlineImForm;
      },
    );
  }

  async addAndUpdateRecordOffline(isIMFormSaved, offlineData, imexUserObj): Promise<boolean> {
    return database.action(async () => {
      const ImFormSuccess = database.collections.get("ImForms");
      if (isIMFormSaved) {
        const record = await ImFormSuccess.find(offlineImFormData[0].id);
        record.update(update => {
          this.addData(update, offlineData, imexUserObj);
          showAlert("", "ImFormSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await ImFormSuccess.create(create => {
          this.addData(create, offlineData, imexUserObj);
          showAlert("", "ImFormSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteIMForm(id): Promise<boolean> {
    return database.action(async () => {
      const ImFormSuccess = database.collections.get("ImForm");
      const record = await ImFormSuccess.find(id);
      record.destroyPermanently();
    });
  }


  addData(record, offlineData, imexUserObj) {
    record.customerName = offlineData.customerName;
    record.operationNo = offlineData.operationNo;
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
