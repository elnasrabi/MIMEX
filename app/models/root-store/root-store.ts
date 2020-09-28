import { AuthStoreModel } from "../../models/auth-store";
import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { HomeStoreModel } from "../home-store";
import { ImFormModel } from "../my-list-store/ImForm-Store";
import { MaturityModel } from "../Maturity-Store/MaturityStore";
import { MaturitySettlementModel } from "../Maturity-Store/MaturitySettlementStore";
import { IssueModel } from "../Issue-Store/Issue-Store";
import { ExFormModel } from "../my-list-store/ExForm-Store";
import { ClaimModel } from "../my-list-store/ClaimStore";
import { ClaimSettlementModel } from "../my-list-store/ClaimSettlementStore"
import { PaymentModel } from "../Payment-Store/PaymentStore";
import { LookupModel } from "../../models/Lookups-Store/Lookup-Store";
import { ContractRequestModel } from "../Contract-Store/ContractRequestStore";
import { OperationRequestModel } from "../Operation-Store/OperationRequestStore";
import { LicenseRequestModel } from "../License-Store/LicenseRequestStore";
import { ContractModel } from "../Contract-Store/ContractStore";
import { OperationModel } from "../Operation-Store/OperationStore";
import { OperationTransferModel } from "../Operation-Store/OperationTransferStore";
import { LicenseModel } from "../License-Store/LicenseStore";
import { DocumentModel } from "../Document-Store/DocumentStore";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  homeStore: types.optional(HomeStoreModel, {}),
  ImFormStore: types.optional(ImFormModel, {}),
  MaturityStore: types.optional(MaturityModel, {}),
  MaturitySettlementStore: types.optional(MaturitySettlementModel, {}),
  ExFormStore: types.optional(ExFormModel, {}),
  IssueStore: types.optional(IssueModel, {}),
  ClaimStore: types.optional(ClaimModel, {}),
  ClaimSettlementStore: types.optional(ClaimSettlementModel, {}),
  PaymentStore: types.optional(PaymentModel, {}),
  LookupStore: types.optional(LookupModel, {}),
  ContractRequestStore: types.optional(ContractRequestModel, {}),
  LicenseRequestStore: types.optional(LicenseRequestModel, {}),
  OperationRequestStore: types.optional(OperationRequestModel, {}),
  ContractStore: types.optional(ContractModel, {}),
  LicenseStore: types.optional(LicenseModel, {}),
  DocumentStore: types.optional(DocumentModel, {}),
  OperationStore: types.optional(OperationModel, {}),
  OperationTransferStore: types.optional(OperationTransferModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
