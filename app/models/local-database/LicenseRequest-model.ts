// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineLicenseData;
export default class LicenseRequestModel extends Model {
  static table = "Licenses";

  static associations = {
    imexUser: { type: "belongs_to", key: "CBOSID" },
  };

  @field("LoadingPort") LoadingPort;
  @field("Destination") Destination;
  @field("ImporterName") formNo;
  @field("ImporterAddress") ImporterAddress;
  @field("ArrivalPort") ArrivalPort;
  @field("TotalValue") TotalValue;
  @field("Currency") Currency;
  @field("Bank") Bank;
  @field("BankBranch") BankBranch;
  @field("Purpose") Purpose;
  @field("CBOSID") CBOSID;
  @field("Notes") Notes;
  @field("LoginName") LoginName;
 
  @relation("imexUser", "imexUser_id") imexUser;

  async getSavedLicense( LoginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const LicenseOfflined = database.collections.get("Licenses");
        offlineLicenseData = await LicenseOfflined
          .query(Q.where("LoginName", LoginName))
          .fetch();
        if (
            offlineLicenseData.length > 0 &&
            offlineLicenseData[0].LoginName===LoginName
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineLicense(LoginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const LicenseOfflined = database.collections.get("Licenses");
        offlineLicenseData = await LicenseOfflined
          .query(Q.where("LoginName", LoginName))
          .fetch();
        return offlineLicenseData[0];
      },
    );
  }

  async getAllSavedLicense(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const LicenseOfflined = database.collections.get("Licenses");
        const offlineLicense = await LicenseOfflined.query().fetch();
        return offlineLicense;
      },
    );
  }

  async addAndUpdateRecordOffline(isLicenseSaved, offlineData, imexUserObj): Promise<boolean> {
    return database.action(async () => {
      const LicenseOfflined = database.collections.get("Licenses");
      if (isLicenseSaved) {
        const record = await LicenseOfflined.find(offlineLicenseData[0].id);
        record.update(update => {
          this.addData(update, offlineData, imexUserObj);
          showAlert("", "LicenseSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await LicenseOfflined.create(create => {
          this.addData(create, offlineData, imexUserObj);
          showAlert("", "LicenseSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteLicense(id): Promise<boolean> {
    return database.action(async () => {
      const LicenseSuccess = database.collections.get("License");
      const record = await LicenseSuccess.find(id);
      record.destroyPermanently();
    });
  }


  addData(record, offlineData, imexUserObj) {
    record.LicenseDesc = offlineData.LicenseDesc;
    record.formNo = offlineData.formNo;
    record.type = offlineData.type;
    record.loginName = offlineData.loginName;
    record.imexUser.set(imexUserObj);
  }
}
