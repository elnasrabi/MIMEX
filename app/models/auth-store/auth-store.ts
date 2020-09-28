import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { omit } from "ramda";
import { Api } from "../../services/api";
import { showAlert } from "../../utils/utils";
const parseString = require("react-native-xml2js").parseString;

/**
 * Model description here for TypeScript hints.
 */
const api = new Api();
api.setup();
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isLoggedIn: false,
    isLoginLoading: false,
    isForgotLoading: false,
    isIm: false,
    isEx: false,
    PasswordShouldChange: false,
    isClaim: false,
    isClaimSettlement: false,
    isMaturity: false,
    isMaturitySettlement: false,
    isPayment: false,
    isContract: false,
    isOperation: false,
    isOperationTransfer: false,
    isLicense: false,
    isBank: false,
    isButtonLoading: false,
    isSearchButtonLoading: false,
    hasStatusData: false,
    IsCBOS: false,
    IsTrader: false,
    OTPCode: types.optional(types.frozen(), 0),
    CBOSID: types.optional(types.frozen(), 0),
    MobileNo: types.optional(types.frozen(), "0"),
    IsFirstLogin: false,
    IsUserExist: false,
    HasData: false,
    IsPasswordChanged: false,
    IsMobileVerified: true,
    shouldUpdate: false,
    hasLoginError: types.optional(types.frozen(), false),
    hasForgotError: types.optional(types.frozen(), false),
    userData: types.optional(types.frozen(), {}),
    userInfo: types.optional(types.frozen(), {}),
    ClientStatusDetails: types.optional(types.frozen(), {}),
    authorization: types.optional(types.frozen(), ""),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    logout() {
      self.isLoggedIn = false;
      self.userData = types.optional(types.frozen(), {});
    },
    login: flow(function* login(username: string, password: string) {
      self.isLoginLoading = true;
      self.hasLoginError = false;
      self.IsMobileVerified = true;
      //self.IsFirstLogin=true;
      try {
        const data = yield api.login(username, password);

        if (data.kind === "ok" && data.Status == 200) {
          self.isLoggedIn = true;
          parseString(data.user, async function(_error, result) {
            self.HasData = true;
            self.userData = result.ArrayOfIMEXUserDto.IMEXUserDto;

            //self.HasData=true;
            if (self.userData[0].UserType[0] === "Bank") {
              self.isBank = true;
              self.IsCBOS = false;
              self.IsTrader = false;

              self.IsFirstLogin = self.userData[0].IsFirstLogin[0] == "true";
              self.IsMobileVerified = self.userData[0].IsMobileVerified[0] == "true";
              if (self.IsFirstLogin || !self.IsMobileVerified) {
                self.isLoggedIn = false;
              } else {
                self.isLoggedIn = true;
              }
            } else if (self.userData[0].UserType[0] === "Trader") {
              self.isBank = false;
              self.IsCBOS = false;
              self.IsTrader = true;
              self.IsFirstLogin = self.userData[0].IsFirstLogin[0] == "true";
              self.IsMobileVerified = self.userData[0].IsMobileVerified[0] == "true";
              if (self.IsFirstLogin || !self.IsMobileVerified) {
                self.isLoggedIn = false;
              } else {
                self.isLoggedIn = true;
              }
            } else if (self.userData[0].UserType[0] === "CBOS") {
              self.isBank = false;
              self.IsTrader = false;
              self.IsCBOS = true;

              self.IsFirstLogin = self.userData[0].IsFirstLogin[0] == "true";
              self.IsMobileVerified = self.userData[0].IsMobileVerified[0] == "true";
              if (self.IsFirstLogin || !self.IsMobileVerified) {
                self.isLoggedIn = false;
              } else {
                self.isLoggedIn = true;
              }
            }
          });
          self.authorization = data.authorization;
        } else {
          self.hasLoginError = true;
        }
        self.isLoginLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    VerifyUser: flow(function* VerifyUser(authorization: string) {
      try {
        const data = yield api.VerifyUser(authorization);

        if (data.kind === "ok") {
          parseString(data.VerifyUser, async function(_error, result) {
            self.IsFirstLogin = false;
          });
        } else {
          showAlert("common.generalerror");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    ChangePassword: flow(function* ChangePassword(
      loginname: string,
      newpassword: string,
      confirmpassword: string,
    ) {
      if (
        newpassword.toString().trim() ===
        confirmpassword
          .toString()
          .trim()
          .trim()
      ) {
        try {
          const data = yield api.ChangePassword(loginname, newpassword);

          if (data.kind === "ok") {
            parseString(data.ChangePassword, async function(_error, result) {
              self.IsPasswordChanged = true;
              self.userData[0].Password = newpassword;
              self.userData.LoginName = loginname;
              self.PasswordShouldChange = false;

              self.isLoggedIn = true;
            });
          } else {
          }
        } catch (erro) {
          showAlert("common.generalerror");
        }
      } else if (newpassword.toString().trim() !== confirmpassword.toString().trim()) {
        self.IsPasswordChanged = false;
      }
    }),

    OTPChangePassword: flow(function* OTPChangePassword(
      loginname: string,
      newpassword: string,
      confirmpassword,
    ) {
      if (
        newpassword.toString().trim() ===
        confirmpassword
          .toString()
          .trim()
          .trim()
      ) {
        try {
          const data = yield api.ChangePassword(loginname, newpassword);

          if (data.kind === "ok") {
            parseString(data.OTPChangePassword, async function(_error, result) {
              self.IsPasswordChanged = true;
            });
            self.authorization = data.authorization;
          } else {
            self.IsPasswordChanged = false;
          }
        } catch (erro) {
          showAlert("common.generalerror");
        }
      } else if (newpassword.toString().trim() !== confirmpassword.toString().trim()) {
        self.IsPasswordChanged = false;
      }
    }),

    GetUserInfo: flow(function* GetUserInfo(loginname: string) {
      try {
        const data = yield api.GetUserInfo(loginname);

        if (data.kind === "ok") {
          parseString(data.GetUser, async function(_error, result) {
            self.IsPasswordChanged = true;
            self.userInfo = result.ArrayOfIMEXUserDto.IMEXUserDto;
            self.IsMobileVerified = self.userInfo[0].IsMobileVerified[0] == "true";

            self.IsUserExist = true;
          });
          self.authorization = data.authorization;
        } else {
          self.IsUserExist = false;
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    GetClientStatus: flow(function* GetClientStatus(authorization: string, cbosid: any) {
      self.isSearchButtonLoading = true;

      try {
        const data = yield api.GetClientStatus(authorization, cbosid);

        if (data.kind === "ok" && data.status == 200) {
          parseString(data.ClientStatus, async function(_error, result) {
            self.ClientStatusDetails = result.ArrayOfClientInqueryDTO.ClientInqueryDTO;
            self.isSearchButtonLoading = false;
            self.hasStatusData = true;
          });
        } else {
          self.isSearchButtonLoading = false;
          self.hasStatusData = false;
          showAlert("common.noData");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    refreshClientStatus() {
      self.isSearchButtonLoading = false;
      self.ClientStatusDetails = {};
    },
    SetCBOSID(value) {
      self.CBOSID = value;
    },
    SetIsIm(value) {
      self.isIm = value;
    },
    SetIsEx(value) {
      self.isEx = value;
    },
    SetIsClaim(value) {
      self.isClaim = value;
    },
    SetIsOperationTransfer(value) {
      self.isOperationTransfer = value;
    },
    SetIsClaimSettlement(value) {
      self.isClaimSettlement = value;
    },
    SetIsMaturity(value) {
      self.isMaturity = value;
    },
    SetIsMaturitySettlement(value) {
      self.isMaturitySettlement = value;
    },
    SetIsPayment(value) {
      self.isPayment = value;
    },
    SetIsContract(value) {
      self.isContract = value;
    },
    SetIsOperation(value) {
      self.isOperation = value;
    },
    SetIsLicense(value) {
      self.isLicense = value;
    },

    IsBank(value) {
      self.isBank = value;
    },
    SetIsFirstLogin(value) {
      self.IsFirstLogin = value;
    },
    SetIsLoggedIn(value) {
      self.isLoggedIn = value;
    },
    SetOTPCode(value) {
      self.OTPCode = value;
    },
    SetMobileNo(value) {
      self.MobileNo = value;
    },
    SetHasData(value) {
      self.HasData = value;
    },
    SetUserExist(value) {
      self.IsUserExist = value;
    },
    SetMobileVerified(value) {
      self.IsMobileVerified = value;
    },
    SetHasLogingError(value) {
      self.hasLoginError = value;
    },
    SetPasswordShouldChange(value) {
      self.PasswordShouldChange = value;
    },
    SetAllIssuesFalse() {
      self.isContract = false;
      self.isLicense = false;
      self.isOperation = false;
      self.isIm = false;
      self.isEx = false;
      self.isOperationTransfer = false;
      self.isClaim = false;
      self.isClaimSettlement = false;
      self.isPayment = false;
      self.isMaturity = false;
      self.isMaturitySettlement = false;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!

  */
  .postProcessSnapshot(
    omit(["hasForgotError", "isForgotLoading", "isLoginLoading", "hasLoginError"]),
  );

type AuthStoreType = Instance<typeof AuthStoreModel>;
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
