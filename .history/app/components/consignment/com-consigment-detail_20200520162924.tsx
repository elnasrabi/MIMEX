import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, Icon, Button } from "../../components"
import { color } from "../../theme"
import { callApi } from "../../utils/utils"
import { MyButton } from "../button/my-button"
import { icons } from "../icon/icons"

export interface ComConsignmentDetailProps {
    navigation?: NativeStackNavigationProp<ParamListBase>
    view?: viewTypes,
    data?: any
}

const viewType = {
    consignment: "consignment",
    customer: "customer",
    specialAction: "specialAction"
}

type viewTypes = keyof typeof viewType

const DETAIL_CONTAINER: ViewStyle = {
    padding: 15,
    flexDirection: "row"
}

const CUSTOMER_CONTAINER: ViewStyle = {
    marginTop: 0,
    padding: 15,
    flexDirection: "row"
}
const DETAIL_VIEW: ViewStyle = { flexDirection: "row" }
const FIRE_BUTTON: ViewStyle = {
    alignSelf: "flex-start"
}
const CONSIGNMENT_VIEW: ViewStyle = { flex: 1 }
const ITEMS_VIEW: ViewStyle = { flex: 0.5, marginStart: 10 }
const CONTINUE: ViewStyle = {
    marginTop: 30,
    alignSelf: "center"
}
const ITEM_LABEL: TextStyle = { color: color.palette.red, marginEnd: 15 }
const CUSTOMER_VIEW: ViewStyle = {
    height: 50,
    backgroundColor: color.palette.toolbar,
    marginTop: 10,
    justifyContent: "center"
}
const TITLE: TextStyle = {
    fontSize: 18,
    textAlign: "left",
    marginStart: 30,
}
export const ComConsignmentDetail: FunctionComponent<ComConsignmentDetailProps> = observer(props => {
    const onFirePress = () => {
        props.navigation.navigate("pdfViewer")
    }
    const onPhonePress = () => {
        callApi("645456456456")
    }
    const renderView = () => {
        if (props.view === viewType.consignment) {
            return (<View style={DETAIL_CONTAINER}>
                <View style={CONSIGNMENT_VIEW}>
                    <View style={DETAIL_VIEW}>
                        <Text tx={"common.consignment"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                        <Text preset={"normal"} text={"ABC545"} />
                    </View>
                    <View style={DETAIL_VIEW}>
                        <Text tx={"common.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                        <Text preset={"normal"} text={"Dispatched"} />
                    </View>
                    <Text tx={"common.address"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />

                    <View style={DETAIL_VIEW}>
                        <Text style={CONSIGNMENT_VIEW} text={"126454 Red Tree Street South Yarra 24"} preset={"normal"} />

                        <View style={ITEMS_VIEW}>
                            <View style={DETAIL_VIEW}>
                                <Text tx={"common.items"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                                <Text text={"12"} preset={"normal"} />
                            </View>
                            <View style={DETAIL_VIEW}>
                                <Text tx={"common.weight"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                                <Text preset={"normal"} text={"24 KG"} />
                            </View>
                        </View>
                    </View>
                </View>
                <Button style={FIRE_BUTTON} preset="link" onPress={onFirePress}>
                    <Icon icon={"fire"} />
                </Button>
            </View>)
        } else if (props.view === viewType.customer) {
            return (<View>
                <View style={CUSTOMER_VIEW}>
                    <Text style={TITLE} tx={"common.customer"} />
                </View>
                <View style={CUSTOMER_CONTAINER}>
                    <View style={CONSIGNMENT_VIEW}>
                        <View style={DETAIL_VIEW}>
                            <Text tx={"common.name"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                            <Text preset={"normal"}>{"Mark belo"}</Text>
                        </View>
                        <View style={DETAIL_VIEW}>
                            <Text tx={"common.contact"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>
                            <Text preset={"normal"}>{"856126555"}</Text>
                        </View>
                        <Text tx={"common.special"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>
                        <Text text={"Line 1 \nLine 2"} preset={"normal"} />
                    </View>
                    <Button style={FIRE_BUTTON} preset="link" onPress={onPhonePress}>
                        <Icon icon={"phone"} />
                    </Button>
                </View>
            </View>
            )
        } else if (props.view === viewType.specialAction) {
            return (<View style={DETAIL_CONTAINER}>
                <View style={CONSIGNMENT_VIEW}>
                    <View style={DETAIL_VIEW}>
                        <Text tx={"common.consignment"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                        <Text preset={"normal"} text={"ABC545"} />
                    </View>
                    <View style={DETAIL_VIEW}>
                        <Text tx={"common.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                        <Text preset={"normal"} text={"Dispatched"} />
                    </View>
                    <Text tx={"common.address"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />

                    <View style={DETAIL_VIEW}>
                        <Text style={CONSIGNMENT_VIEW} text={"126454 Red Tree Street South Yarra 24"} preset={"normal"} />
                    </View>
                </View>
                <MyButton
                    style={CONTINUE}
                    buttonSource={icons.blueButton}
                    imageBackground={{ height: 100, width: 100 }}
                    // isLoading={authStore.isLoginLoading}
                    tx="loginScreen.login"
                    onPress={onFirePress}
                />
            </View>)
        }
    }
    return (
        <View>
            {renderView()}
        </View>
    )
})
