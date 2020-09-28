// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, children } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";

let offlineImportData;
let OfflineIssueData;
export default class imexUserModel extends Model {
  static table = "imexUser";
  static associations = {
    imports: { type: "has_many", foreignKey: "imexUser_id" },
  };

  @field("imexUser_id") imexUserId;
  @field("cbosid") cbosId;
  @field("fullname") fullName;
  @field("mobileNo") mobileNo;
  @field("bank") bank;
  @field("branch") branch;
  @field("login_name") loginName;
  @field("password_updated") passwordUpdated;
  @field("imexUser_type_name") imexUserTypeName;

  @children("import") import;
  @children("Issues") Issue;

  async getimexUserData(loginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const ImportLocalData = database.collections.get("imexUser");
        offlineImportData = await ImportLocalData
          .query(Q.where("login_name", loginName))
          .fetch();
        return offlineImportData;
      },
    );
  }

  async getimexUserIssueData(loginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const ImportLocalData = database.collections.get("imexUser");
        OfflineIssueData = await ImportLocalData
          .query(Q.where("login_name", loginName))
          .fetch();
        return OfflineIssueData;
      },
    );
  }

  async getImport(imexUserObj): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const Imports = await imexUserObj.Import.fetch();
        return false;
      },
    );
  }



  async getIssue(imexUserObj): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const issue = await imexUserObj.Issues.fetch();
        return false;
      },
    );
  }
  async addimexUserData(isimexUserSaved, offlineData) {
    database.action(async () => {
      const imexUserTable = database.collections.get("imexUser");
      if (isimexUserSaved) {
        const record = await imexUserTable.find(offlineImportData[0].id);
        record.update(update => {
          this.addData(update, offlineData);
        });
      } else {
        await imexUserTable.create(create => {
          this.addData(create, offlineData);
        });
      }
    });
  }

  async addimexUserIssueData(isimexUserSaved, offlineData) {
    database.action(async () => {
      const imexUserTable = database.collections.get("imexUser");
      if (isimexUserSaved) {
        const record = await imexUserTable.find(offlineImportData[0].id);
        record.update(update => {
          this.addData(update, offlineData);
        });
      } else {
        await imexUserTable.create(create => {
          this.addData(create, offlineData);
        });
      }
    });
  }

  addData(record, offlineData) {
    record.imexUser_id = offlineData[0].imexUser_id[0];
    record.cbosId = offlineData[0].cbosId[0];
    record.fullName = offlineData[0].fullName[0];
    record.mobileNo = offlineData[0].mobileNo[0];
    record.bank = offlineData[0].bank[0];
    record.branch = offlineData[0].branch[0];
    record.loginName = offlineData[0].loginName[0];
    record.passwordUpdated = offlineData[0].passwordUpdated[0];
    record.imexUserTypeName = offlineData[0].imexUserTypeName[0];
  }
}
