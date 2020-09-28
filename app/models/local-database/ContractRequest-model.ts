// models/Movie.js
import { Model, Q } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { database } from "../../app";
import { showAlert } from "../../utils/utils";

let offlineContractData;
export default class ContractRequestModel extends Model {
  static table = "Contracts";

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
  @field("ShipingType") ShipingType;
  @field("CBOSID") CBOSID;
  @field("Notes") Notes;
  @field("LoginName") LoginName;
 
  @relation("imexUser", "imexUser_id") imexUser;

  async getSavedContract( LoginName): Promise<boolean> {
    return await database.action(
      async (): Promise<boolean> => {
        const ContractOfflined = database.collections.get("Contracts");
        offlineContractData = await ContractOfflined
          .query(Q.where("LoginName", LoginName))
          .fetch();
        if (
            offlineContractData.length > 0 &&
            offlineContractData[0].LoginName===LoginName
        ) {
          return true;
        }
        return false;
      },
    );
  }

  async getOfflineContract(LoginName): Promise<any> {
    return await database.action(
      async (): Promise<boolean> => {
        const ContractOfflined = database.collections.get("Contracts");
        offlineContractData = await ContractOfflined
          .query(Q.where("LoginName", LoginName))
          .fetch();
        return offlineContractData[0];
      },
    );
  }

  async getAllSavedContract(): Promise<any> {
    return await database.action(
      async (): Promise<any> => {
        const ContractOfflined = database.collections.get("Contracts");
        const offlineContract = await ContractOfflined.query().fetch();
        return offlineContract;
      },
    );
  }

  async addAndUpdateRecordOffline(isContractSaved, offlineData, imexUserObj): Promise<boolean> {
    return database.action(async () => {
      const ContractOfflined = database.collections.get("Contracts");
      if (isContractSaved) {
        const record = await ContractOfflined.find(offlineContractData[0].id);
        record.update(update => {
          this.addData(update, offlineData, imexUserObj);
          showAlert("", "ContractSuccess.offlineDataSaveMessage");
          return true;
        });
      } else {
        await ContractOfflined.create(create => {
          this.addData(create, offlineData, imexUserObj);
          showAlert("", "ContractSuccess.offlineDataSaveMessage");
          return true;
        });
      }
    });
  }

  async deleteContract(id): Promise<boolean> {
    return database.action(async () => {
      const ContractSuccess = database.collections.get("Contract");
      const record = await ContractSuccess.find(id);
      record.destroyPermanently();
    });
  }


  addData(record, offlineData, imexUserObj) {
    record.ContractDesc = offlineData.ContractDesc;
    record.formNo = offlineData.formNo;
    record.type = offlineData.type;
    record.loginName = offlineData.loginName;
    record.imexUser.set(imexUserObj);
  }
}
