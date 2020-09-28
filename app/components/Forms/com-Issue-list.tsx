import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "../../components";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ComIssueListProps {
  navigation?: NativeStackNavigationProp<ParamListBase>;
  item: any;

  index: any;
}

const FLAT_LIST: ViewStyle = {
  padding: 10,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  margin: 10,
  borderRadius: 5,
  backgroundColor: color.palette.listBG,
};
const FLAT_LIST_VIEW: ViewStyle = { flex: 1 };
const IssueId_View: ViewStyle = { flexDirection: "row", justifyContent: "space-evenly" };
const IssueID: ViewStyle = { flex: 1 };
const IssueDesc: ViewStyle = { flex: 1 };
const IssueDesc_Value: TextStyle = { flex: 1, color: color.palette.red };
const IssueID_Value: TextStyle = { flex: 1, color: color.palette.red };
const Form_Date_VIEW: ViewStyle = { flexDirection: "row" };
const Form_Date_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText, flex: 1 };
const Form_Date_VALUE: TextStyle = { marginEnd: 10, flex: 1, color: color.palette.link };
const Bank_Branch_VIEW: ViewStyle = { flexDirection: "row" };
const Bank_Branch_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Bank_Branch_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 5 };
const IssueStatus_View: ViewStyle = { flexDirection: "row", flex: 1 };
const IssueStatus_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText, flex: 1 };
const IssueStatus_VALUE: TextStyle = { marginEnd: 10, flex: 1, color: color.palette.red };
const VOLUME_VIEW: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginStart: 10,
  justifyContent: "flex-end",
};
const WEIGHT_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText };
const STATUS: TextStyle = { color: color.palette.link };
const TEXT_VIEW: ViewStyle = { flexDirection: "row" };
const TEXT_VALUE: TextStyle = { color: color.palette.link };
const TEXT_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };

export const ComIssueList: FunctionComponent<ComIssueListProps> = observer(props => {
  const { item, index } = props;
  const { authStore } = useStores();
  const Issues = item;
  return (
    <View key={index} style={FLAT_LIST}>
      {!authStore.IsTrader && (
        <View style={FLAT_LIST_VIEW}>
          <Text style={ITEM_LABEL} tx="IssueList.by" />
          <Text style={TEXT_VALUE} text={Issues.FullName ? Issues.FullName : " "} />
        </View>
      )}
      <View style={TEXT_VIEW}>
        <Text extraText={":"} tx={"IssueList.issueid"} style={Form_Date_LABEL} preset={"normal"} />
        <Text style={IssueID_Value} preset={"normal"}>
          {Issues.Id}
        </Text>
      </View>
      <View style={TEXT_VIEW}>
        <Text
          extraText={":"}
          tx={"IssueList.issuestatus"}
          style={IssueStatus_LABEL}
          preset={"normal"}
        />
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {Issues.IssueStatus}
        </Text>
      </View>

      <View style={TEXT_VIEW}>
        <Text extraText={":"} tx={"IssueList.code"} style={Form_Date_LABEL} preset={"normal"} />

        <Text style={Form_Date_VALUE} preset={"normal"}>
          {Issues.FormNo}
        </Text>
      </View>

      <View style={TEXT_VIEW}>
        <Text
          extraText={":"}
          tx={"IssueList.ObjectName"}
          style={Form_Date_LABEL}
          preset={"normal"}
        />
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {Issues.ObjectName}
        </Text>
      </View>

      <View style={TEXT_VIEW}>
        <Text
          extraText={":"}
          tx={"IssueList.lastupdate"}
          style={Form_Date_LABEL}
          preset={"normal"}
        />
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {Issues.IssueDate}
        </Text>
      </View>

      <View style={TEXT_VIEW}>
        <Text
          extraText={":"}
          tx={"IssueList.issuedesc"}
          style={Form_Date_LABEL}
          preset={"normal"}
        />
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {Issues.IssueDesc}
        </Text>
      </View>

      <View style={TEXT_VIEW}>
        <Text
          extraText={":"}
          tx={"IssueList.resolvecomment"}
          style={Form_Date_LABEL}
          preset={"normal"}
        />
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {Issues.ResolveComment}
        </Text>
      </View>
    </View>
  );
});
