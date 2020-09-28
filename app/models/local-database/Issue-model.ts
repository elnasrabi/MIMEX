// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineIssueData;
export default class IssueModel extends Model {
  static table = "Issues";

  static associations = {
    imexUser: { type: "belongs_to", key: "imexUser_id" },
  };

  @field("issue_desc") issueDesc;
  @field("type") type;
  @field("form_no") formNo;
  @field("login_name") loginName;

  @relation("imexUser", "imexUser_id") imexUser;

  async getSavedIssue(formNo, loginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const IssueOfflined = database.collections.get("Issues");
        offlineIssueData = await IssueOfflined
          .query(Q.where("form_no", formNo))
          .fetch();
        if (
            offlineIssueData.length > 0 &&
            offlineIssueData[0].form_no === formNo && offlineIssueData[0].login_name===loginName
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineIssue(formNo, loginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const IssueOfflined = database.collections.get("Issues");
        offlineIssueData = await IssueOfflined
          .query(Q.where("form_no", formNo))
          .fetch();
        return offlineIssueData[0];
      },
    );
  }

  async getAllSavedIssue(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const IssueOfflined = database.collections.get("Issues");
        const offlineIssue = await IssueOfflined.query().fetch();
        return offlineIssue;
      },
    );
  }

  async addAndUpdateRecordOffline(isIssueSaved, offlineData, imexUserObj): Promise<boolean> {
    return database.action(async () => {
      const IssueOfflined = database.collections.get("Issues");
      if (isIssueSaved) {
        const record = await IssueOfflined.find(offlineIssueData[0].id);
        record.update(update => {
          this.addData(update, offlineData, imexUserObj);
          showAlert("", "IssueSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await IssueOfflined.create(create => {
          this.addData(create, offlineData, imexUserObj);
          showAlert("", "IssueSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteIssue(id): Promise<boolean> {
    return database.action(async () => {
      const IssueSuccess = database.collections.get("Issue");
      const record = await IssueSuccess.find(id);
      record.destroyPermanently();
    });
  }


  addData(record, offlineData, imexUserObj) {
    record.issueDesc = offlineData.issueDesc;
    record.formNo = offlineData.formNo;
    record.type = offlineData.type;
    record.loginName = offlineData.loginName;
    record.imexUser.set(imexUserObj);
  }
}
