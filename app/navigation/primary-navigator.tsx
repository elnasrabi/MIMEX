/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { LandingScreen } from "../screens";
import { UserSetting } from "../screens/user-screen/user-setting-screen";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { PrimaryParamList } from "./types";
import { CustomDrawerContent } from "../components/drawer-menu/CustomDrawerContent";
import { ImForm } from "../screens/myList-screen/ImForm-screen";
import { MyRequests } from "../screens/Request/Requests-screen";
import { MyExRequests } from "../screens/Request/ExRequests-screen";
import { MyImRequests } from "../screens/Request/ImRequests-screen";
import { PDFViewer } from "../screens/pdf-view/pdf-viewer-screen";
import { HelpScreen } from "../screens/help-screen/help-screen";
import { IMFormList } from "../screens/myList-screen/ImFormList-screen";
import { ImFormDetail } from "../screens/myList-screen/ImFormDetail-screen";
import { ReportIssue } from "../screens/myIssues-screen/reportIssue-screen";
import { Issue } from "../screens/myIssues-screen/MyIssue-screen";
import { IssueList } from "../screens/myIssues-screen/MyIssue-list-screen";
import { ExFormList } from "../screens/myList-screen/ExFormList-screen";
import { ExFormDetail } from "../screens/myList-screen/ExFormDetail-screen";
import { ExForm } from "../screens/myList-screen/ExForm-screen";
import { ContractRequestList } from "../screens/ContractRequest/ContractRequestList-screen";
import { ContractRequestDetail } from "../screens/ContractRequest//ContractRequestDetail-screen";
import { ContractRequest } from "../screens/ContractRequest/ContractRequest-screen";
import { ContractList } from "../screens/Contract/ContractList-screen";
import { ContractDetail } from "../screens/Contract//ContractDetail-screen";
import { Contract } from "../screens/Contract/Contract-screen";
import { LicenseRequestDetail } from "../screens/LicenseRequest//LicenseRequestDetail-screen";
import { LicenseRequest } from "../screens/LicenseRequest/LicenseRequest-screen";
import { LicenseList } from "../screens/License/LicenseList-screen";
import { LicenseDetail } from "../screens/License//LicenseDetail-screen";
import { License } from "../screens/License/License-screen";
import { OperationRequestList } from "../screens/OperationRequest/OperationRequestList-screen";
import { OperationRequestDetail } from "../screens/OperationRequest//OperationRequestDetail-screen";
import { OperationRequest } from "../screens/OperationRequest/OperationRequest-screen";
import { OperationList } from "../screens/Operation/OperationList-screen";
import { OperationDetail } from "../screens/Operation//OperationDetail-screen";
import { Operation } from "../screens/Operation/Operation-screen";
import { OperationTransferList } from "../screens/Operation/OperationTransferList-screen";
import { OperationTransferDetail } from "../screens/Operation//OperationTransferDetail-screen";
import { OperationTransfer } from "../screens/Operation/OperationTransfer-screen";
import { ChangePassword } from "../screens/auth-screens/changepassword-screen";
import { Claim } from "../screens/Claim-screen/Claim-screen";
import { ClaimList } from "../screens/Claim-screen/ClaimList-screen";
import { ClaimDetail } from "../screens/Claim-screen/ClaimDetail-screen";
import { Document } from "../screens/UploadDocument-screen//Document-screen";
import { DocumentList } from "../screens/UploadDocument-screen/DocumentList-screen";
import { Maturity } from "../screens/Maturity-screen/Maturity-screen";
import { MaturityList } from "../screens/Maturity-screen/MaturityList-screen";
import { MaturityDetail } from "../screens/Maturity-screen/MaturityDetail-screen";
import { MaturitySettlement } from "../screens/Maturity-screen/MaturitySettlement-screen";
import { MaturitySettlementList } from "../screens/Maturity-screen/MaturitySettlementList-screen";
import { MaturitySettlementDetail } from "../screens/Maturity-screen/MaturitySettlementDetail-screen";
import { ClaimSettlement } from "../screens/Claim-screen/ClaimSettlement-screen";
import { ClaimSettlementList } from "../screens/Claim-screen/ClaimSettlementList-screen";
import { ClaimSettlementDetail } from "../screens/Claim-screen/ClaimSettlementDetail-screen";
import { Payment } from "../screens/Payment-screen/Payment-screen";
import { PaymentList } from "../screens/Payment-screen/PaymentList-screen";
import { PaymentDetail } from "../screens/Payment-screen/PaymentDetail-screen";
import { NewContractRequest } from "../screens/ContractRequest/NewContractRequest-screen";
import { NewContractRequestCommodity } from "../screens/ContractRequest/NewContractRequestCommodity-screen";
import { NewContractRequestPaymentMethod } from "../screens/ContractRequest/NewContractRequestPaymentMethod";
import { UpdateContractRequest } from "../screens/ContractRequest/UpdateContractRequest-screen";
import { UpdateContractRequestCommodity } from "../screens/ContractRequest/UpdateContractRequestCommodity-screen";
import { UpdateContractRequestPaymentMethod } from "../screens/ContractRequest/UpdateContractRequestPaymentMethod";
import { NewLicenseRequest } from "../screens/LicenseRequest/NewLicenseRequest-screen";
import { NewLicenseRequestCommodity } from "../screens/LicenseRequest/NewLicenseRequestCommodity-screen";
import { UpdateLicenseRequest } from "../screens/LicenseRequest/UpdateLicenseRequest-screen";
import { UpdateLicenseRequestCommodity } from "../screens/LicenseRequest/UpdateLicenseRequestCommodity-screen";
import { NewOperationRequest } from "../screens/OperationRequest/NewOperationRequest-screen";
import { NewOperationRequestCommodity } from "../screens/OperationRequest/NewOperationRequestCommodity-screen";
import { NewOperationRequestPaymentMethod } from "../screens/OperationRequest/NewOperationRequestPaymentMethod";
import { UpdateOperationRequest } from "../screens/OperationRequest/UpdateOperationRequest-screen";
import { UpdateOperationRequestCommodity } from "../screens/OperationRequest/UpdateOperationRequestCommodity-screen";
import { UpdateOperationRequestPaymentMethod } from "../screens/OperationRequest/UpdateOperationRequestPaymentMethod";
import { UploadDocument } from "../screens/UploadDocument-screen/UploadDocument-screen";
import { ClientStatus } from "../screens/user-screen/ClientStatus-screen";
import { SearchClientStatus } from "../screens/user-screen/SearchClientStatus-screen";




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<PrimaryParamList>();




const MyImFormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      <Stack.Screen name="ImForm" component={ImForm} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
      <Stack.Screen name="pdfViewer" component={PDFViewer} />
      <Stack.Screen name="NewOperationRequest" component={NewOperationRequest} />
      <Stack.Screen name="NewOperationRequestCommodity" component={NewOperationRequestCommodity} />
      <Stack.Screen name="NewOperationRequestPaymentMethod" component={NewOperationRequestPaymentMethod} />
    </Stack.Navigator>
  );
};


const MyExFormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      <Stack.Screen name="ExForm" component={ExForm} />
      <Stack.Screen name="ContractRequest" component={ContractRequest} />
      <Stack.Screen name="NewContractRequest" component={NewContractRequest} />
      <Stack.Screen name="NewContractRequestCommodity" component={NewContractRequestCommodity} />
      <Stack.Screen name="NewContractRequestPaymentMethod" component={NewContractRequestPaymentMethod} />

      <Stack.Screen name="UpdateContractRequest" component={UpdateContractRequest} />
      <Stack.Screen name="UpdateContractRequestCommodity" component={UpdateContractRequestCommodity} />
      <Stack.Screen name="UpdateContractRequestPaymentMethod" component={UpdateContractRequestPaymentMethod} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
      <Stack.Screen name="pdfViewer" component={PDFViewer} />
    </Stack.Navigator>
  );
};



const MyClaimStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      <Stack.Screen name="Claim" component={Claim} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
      <Stack.Screen name="pdfViewer" component={PDFViewer} />
    </Stack.Navigator>
  );
};

const MyIssueStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      <Stack.Screen name="Issue" component={Issue} />
      <Stack.Screen name="IssueList" component={IssueList} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />

    </Stack.Navigator>
  );
};


const ImFormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      <Stack.Screen name="ImFormDetail" component={ImFormDetail} />
       <Stack.Screen name="ImFormList" component={IMFormList} />
      <Stack.Screen name="ImForm" component={ImForm} />

      <Stack.Screen name="OperationRequestList" component={OperationRequestList} />
      <Stack.Screen name="OperationRequestDetail" component={OperationRequestDetail} />
      <Stack.Screen name="OperationRequest" component={OperationRequest} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
      <Stack.Screen name="NewOperationRequest" component={NewOperationRequest} />
      <Stack.Screen name="NewOperationRequestCommodity" component={NewOperationRequestCommodity} />
      <Stack.Screen name="NewOperationRequestPaymentMethod" component={NewOperationRequestPaymentMethod} />
    </Stack.Navigator>
  );
};

const ExFormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      <Stack.Screen name="ExFormDetail" component={ExFormDetail} />
       <Stack.Screen name="ExFormList" component={ExFormList} />
      <Stack.Screen name="ExForm" component={ExForm} />
      <Stack.Screen name="ContractRequestList" component={ContractRequestList} />
      <Stack.Screen name="ContractRequestDetail" component={ContractRequestDetail} />
      <Stack.Screen name="ContractRequest" component={ContractRequest} />

      <Stack.Screen name="NewContractRequest" component={NewContractRequest} />
      <Stack.Screen name="NewContractRequestCommodity" component={NewContractRequestCommodity} />
      <Stack.Screen name="NewContractRequestPaymentMethod" component={NewContractRequestPaymentMethod} />

      
      <Stack.Screen name="UpdateContractRequest" component={UpdateContractRequest} />
      <Stack.Screen name="UpdateContractRequestCommodity" component={UpdateContractRequestCommodity} />
      <Stack.Screen name="UpdateContractRequestPaymentMethod" component={UpdateContractRequestPaymentMethod} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};



const ContractRequestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
    
      {/* <Stack.Screen name="ContractRequestList" component={ContractRequestList} /> */}
      <Stack.Screen name="ContractRequestDetail" component={ContractRequestDetail} />
      <Stack.Screen name="UploadDocument" component={UploadDocument} />
      <Stack.Screen name="ContractRequest" component={ContractRequest} />

      <Stack.Screen name="NewContractRequest" component={NewContractRequest} />
      <Stack.Screen name="NewContractRequestCommodity" component={NewContractRequestCommodity} />
      <Stack.Screen name="NewContractRequestPaymentMethod" component={NewContractRequestPaymentMethod} />

      
      <Stack.Screen name="UpdateContractRequest" component={UpdateContractRequest} />
      <Stack.Screen name="UpdateContractRequestCommodity" component={UpdateContractRequestCommodity} />
      <Stack.Screen name="UpdateContractRequestPaymentMethod" component={UpdateContractRequestPaymentMethod} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};

const LicenseRequestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="LicenseRequestList" component={LicenseRequestList} /> */}
      <Stack.Screen name="LicenseRequestDetail" component={LicenseRequestDetail} />
      <Stack.Screen name="LicenseRequest" component={LicenseRequest} />

      <Stack.Screen name="NewLicenseRequest" component={NewLicenseRequest} />
      <Stack.Screen name="NewLicenseRequestCommodity" component={NewLicenseRequestCommodity} />
     

      
      <Stack.Screen name="UpdateLicenseRequest" component={UpdateLicenseRequest} />
      <Stack.Screen name="UpdateLicenseRequestCommodity" component={UpdateLicenseRequestCommodity} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};


const LicenseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="LicenseList" component={LicenseList} /> */}
      <Stack.Screen name="LicenseDetail" component={LicenseDetail} />
      <Stack.Screen name="LicenseList" component={LicenseList} />
      <Stack.Screen name="License" component={License} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};


const ContractStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="ContractList" component={ContractList} /> */}
      <Stack.Screen name="ContractDetail" component={ContractDetail} />
      <Stack.Screen name="ContractList" component={ContractList} />
      <Stack.Screen name="Contract" component={Contract} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};

const OperationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="OperationList" component={OperationList} /> */}
      <Stack.Screen name="OperationDetail" component={OperationDetail} />
      <Stack.Screen name="OperationList" component={OperationList} />
      <Stack.Screen name="Operation" component={Operation} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};


const ClaimSettlementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="ClaimSettlementList" component={ClaimSettlementList} /> */}
      <Stack.Screen name="ClaimSettlementDetail" component={ClaimSettlementDetail} />
      <Stack.Screen name="ClaimSettlementList" component={ClaimSettlementList} />
      <Stack.Screen name="ClaimSettlement" component={ClaimSettlement} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};


const PaymentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="PaymentList" component={PaymentList} /> */}
      <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
      <Stack.Screen name="PaymentList" component={PaymentList} />
      <Stack.Screen name="Payment" component={Payment} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};


const OperationTransferStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="OperationTransferList" component={OperationTransferList} /> */}
      <Stack.Screen name="OperationTransferDetail" component={OperationTransferDetail} />
      <Stack.Screen name="OperationTransferList" component={OperationTransferList} />
      <Stack.Screen name="OperationTransfer" component={OperationTransfer} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};


const MaturityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="MaturityList" component={MaturityList} /> */}
      <Stack.Screen name="MaturityDetail" component={MaturityDetail} />
      <Stack.Screen name="MaturityList" component={MaturityList} />
      <Stack.Screen name="Maturity" component={Maturity} />

      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};

const MaturitySettlementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="MaturitySettlementList" component={MaturitySettlementList} /> */}
      <Stack.Screen name="MaturitySettlementDetail" component={MaturitySettlementDetail} />
      <Stack.Screen name="MaturitySettlementList" component={MaturitySettlementList} />
      <Stack.Screen name="MaturitySettlement" component={MaturitySettlement} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};




const OperationRequestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
     
     
      {/* <Stack.Screen name="OperationRequestList" component={OperationRequestList} /> */}
      <Stack.Screen name="OperationRequestDetail" component={OperationRequestDetail} />
      <Stack.Screen name="OperationRequest" component={OperationRequest} />

      <Stack.Screen name="NewOperationRequest" component={NewOperationRequest} />
      <Stack.Screen name="NewOperationRequestCommodity" component={NewOperationRequestCommodity} />
      <Stack.Screen name="NewOperationRequestPaymentMethod" component={NewOperationRequestPaymentMethod} />

      
      <Stack.Screen name="UpdateOperationRequest" component={UpdateOperationRequest} />
      <Stack.Screen name="UpdateOperationRequestCommodity" component={UpdateOperationRequestCommodity} />
      <Stack.Screen name="UpdateOperationRequestPaymentMethod" component={UpdateOperationRequestPaymentMethod} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};





const LandingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      <Stack.Screen name="Home" component={LandingScreen} />
      <Stack.Screen name="ClientStatus" component={ClientStatus} />
      <Stack.Screen name="SearchClientStatus" component={SearchClientStatus} />
      <Stack.Screen name="MyRequests" component={MyRequests} />
      <Stack.Screen name="MyExRequests" component={MyExRequests} />
      <Stack.Screen name="MyImRequests" component={MyImRequests} />
      <Stack.Screen name="UploadDocument" component={UploadDocument} />
      <Stack.Screen name="ImForm" component={ImForm} />
      <Stack.Screen name="Maturity" component={Maturity} />
      <Stack.Screen name="ExForm" component={ExForm} />
      <Stack.Screen name="ContractRequest" component={ContractRequest} />
      <Stack.Screen name="Contract" component={Contract} />
      <Stack.Screen name="ContractDetail" component={ContractDetail} />
      <Stack.Screen name="ContractList" component={ContractList} />
      <Stack.Screen name="LicenseRequest" component={LicenseRequest} />
      <Stack.Screen name="License" component={License} />
      <Stack.Screen name="LicenseDetail" component={LicenseDetail} />
      <Stack.Screen name="LicenseList" component={LicenseList} />
      <Stack.Screen name="OperationRequest" component={OperationRequest} />
      <Stack.Screen name="Operation" component={Operation} />
      <Stack.Screen name="OperationList" component={OperationList} />
      <Stack.Screen name="OperationDetail" component={OperationDetail} />
      <Stack.Screen name="OperationTransfer" component={OperationTransfer} />
      <Stack.Screen name="OperationTransferDetail" component={OperationTransferDetail} />
      <Stack.Screen name="OperationTransferList" component={OperationTransferList} />
      <Stack.Screen name="Claim" component={Claim} />
      <Stack.Screen name="Document" component={Document} />
      <Stack.Screen name="pdfViewer" component={PDFViewer} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
      <Stack.Screen name="PaymentList" component={PaymentList} />
      <Stack.Screen name="ClaimSettlement" component={ClaimSettlement} />
      <Stack.Screen name="ImFormList" component={IMFormList} />
      <Stack.Screen name="MaturityList" component={MaturityList} />
      <Stack.Screen name="MaturitySettlement" component={MaturitySettlement} />
      <Stack.Screen name="ImFormDetail" component={ImFormDetail} />
      <Stack.Screen name="MaturityDetail" component={MaturityDetail} />
      <Stack.Screen name="MaturitySettlementDetail" component={MaturitySettlementDetail} />
      <Stack.Screen name="MaturitySettlementList" component={MaturitySettlementList} />
      <Stack.Screen name="ExFormList" component={ExFormList} />
      <Stack.Screen name="ExFormDetail" component={ExFormDetail} />
      {/* <Stack.Screen name="ContractRequestList" component={ContractRequestStack} /> */}
      <Stack.Screen name="ContractRequestDetail" component={ContractRequestStack} />
      {/* <Stack.Screen name="LicenseRequestList" component={LicenseRequestStack} /> */}
      <Stack.Screen name="LicenseRequestDetail" component={LicenseRequestStack} />
      {/* <Stack.Screen name="OperationRequestList" component={OperationRequestStack} /> */}
      <Stack.Screen name="OperationRequestDetail" component={OperationRequestStack} />
      <Stack.Screen name="ClaimList" component={ClaimList} />
      <Stack.Screen name="DocumentList" component={DocumentList} />
      <Stack.Screen name="ClaimSettlementList" component={ClaimSettlementList} />
      <Stack.Screen name="ClaimDetail" component={ClaimDetail} />
      <Stack.Screen name="ClaimSettlementDetail" component={ClaimSettlementDetail} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
      <Stack.Screen name="Issue" component={Issue} />
      <Stack.Screen name="IssueList" component={IssueList} />
      <Stack.Screen name="NewContractRequest" component={NewContractRequest} />
      <Stack.Screen name="NewContractRequestCommodity" component={NewContractRequestCommodity} />
      <Stack.Screen name="NewContractRequestPaymentMethod" component={NewContractRequestPaymentMethod} />
      <Stack.Screen name="NewLicenseRequest" component={NewLicenseRequest} />
      <Stack.Screen name="NewLicenseRequestCommodity" component={NewLicenseRequestCommodity} />
      <Stack.Screen name="NewOperationRequest" component={NewOperationRequest} />
      <Stack.Screen name="NewOperationRequestCommodity" component={NewOperationRequestCommodity} />
      <Stack.Screen name="NewOperationRequestPaymentMethod" component={NewOperationRequestPaymentMethod} />
     
    </Stack.Navigator>
  );
};

export function PrimaryNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerType="slide"
      keyboardDismissMode="on-drag"
      drawerStyle={{
        width: 250,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="LandingStack" component={LandingStack} />
      <Drawer.Screen name="LandingScreen" component={LandingScreen} />
      <Drawer.Screen name="ImFormStack" component={ImFormStack} />
      <Drawer.Screen name="OperationTransferStack" component={OperationTransferStack} />
      <Drawer.Screen name="OperationStack" component={OperationStack} />
      <Drawer.Screen name="ContractStack" component={ContractStack} />
      <Drawer.Screen name="LicenseStack" component={LicenseStack} />
      <Drawer.Screen name="MaturityStack" component={MaturityStack} />
      <Drawer.Screen name="MaturitySettlementStack" component={MaturitySettlementStack} />
      <Drawer.Screen name="ExFormStack" component={ExFormStack} />
      <Drawer.Screen name="userSetting" component={UserSetting} />
      <Drawer.Screen name="MyImFormStack" component={MyImFormStack} />
      <Drawer.Screen name="MyExFormStack" component={MyExFormStack} />
      <Drawer.Screen name="MyClaimStack" component={MyClaimStack} />
      <Drawer.Screen name="ClaimSettlementStack" component={ClaimSettlementStack} />
      <Drawer.Screen name="PaymentStack" component={PaymentStack} />
      <Drawer.Screen name="MyIssueStack" component={MyIssueStack} />
      <Drawer.Screen name="HelpScreen" component={HelpScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
// export const exitRoutes: string[] = ["landing"]
