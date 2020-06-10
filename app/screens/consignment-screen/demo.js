import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Moment from "moment";

// Styles
import styles from "./style";
import MyTextInput from "../../Components/MyTextInput";
import {
  toUpperCase,
  GOOGLE_PLACE_API_KEY,
  getDeviceType,
  getFormatedDate,
  getDeviceInfo,
  gotoLogin
} from "../../Config/utils";
import MyButton from "../../Components/MyButton";
import colors from "../../Themes/Colors";
import MyHeader from "../../Components/MyHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Api from "../../Services/Api";
import MyAlertDialog from "../../Components/MyAlertDialog";
import LoadingScreen from "../../Components/LoadingScreen";
import NetInfo from "@react-native-community/netinfo";
import Locals from "../../Config/Locals";
import { connect } from "react-redux";
import loginReducer from "../../Redux/reducers/LoginReducer";
import {
  getUser,
  startTrip,
  updatedLocation
} from "../../Redux/actions/LoginAction";
import {
  navRoutes,
  DASHBOARD_STACK,
  FORGOT_SCREEN,
  END_TRIP,
  TRIP_MAP_VIEW
} from "../../Navigation/navRoutes";
import images from "../../Themes/Images";
import Geolocation from "@react-native-community/geolocation";
import {
  AppPermission,
  LOCATION_PERMISSION,
  PERMISSION_AUTHORIZED
} from "../../Config/Permission";
import MyAlertDialogOption from "../../Components/MyAlertDialogOption";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { UNAUTHORIZED } from "../../Config/Constant";
import { NativeModules } from "react-native";
import TripMapView from "../MapView/TripMapView";
const { BatteryOptimization } = NativeModules;
const ALLOWED = "ALLOWED";
const NOT_ALLOWED = "NOT_ALLOWED";
const DENY = "DENY";
class StartTrip extends Component {
  constructor(props) {
    super(props);
    this.location;
    this.address;
    this.btnType;
    this.address = undefined;
  }
  state = {
    visitorName: "",
    visitorContact: "",
    isValidVisitor: true,
    isValidContact: true,
    visibleModel: false,
    visibleOptionModel: false,
    message: "",
    loading: false
  };

  async componentDidMount() {
    if (getDeviceType() == "Android") {
      BatteryOptimization.isBatteryOptimizationDisable(result => {
        if (result == NOT_ALLOWED) {
          Alert.alert(
            "",
            "Please allow the app to run in the background to get accurate location.",
            [
              {
                text: "CANCEL",
                onPress: () => {
                  this.props.navigation.goBack();
                }
              },
              {
                text: "OK",
                onPress: () => {
                  BatteryOptimization.disableBatteryOptimization(isAllow => {
                    if (isAllow == DENY) {
                      this.props.navigation.goBack();
                    }
                  });
                }
              }
            ],
            { cancelable: false }
          );
        }
      });
    }

    // RNTurnOffOptimization.isOptimizationTurnedOn().then(isTurnedOn => {
    //   if (isTurnedOn) {
    //     RNTurnOffOptimization.openTurnOffOptimizationModal();
    //   }
    // });

    // if (getDeviceType() == "Android") {
    //   RNTurnOffOptimization.isOptimizationTurnedOn().then(isTurnedOn => {
    //     if (isTurnedOn) {
    //       Alert.alert(
    //         "",
    //         "Please disable the battery optimization to track device in the background.",
    //         [
    //           {
    //             text: "OK",
    //             onPress: () => {
    //               RNTurnOffOptimization.openTurnOffOptimizationModal();
    //             }
    //           }
    //         ],
    //         { cancelable: false }
    //       );
    //     }
    //   });
    // }
    this.address = undefined;
    setTimeout(() => {
      if (getDeviceType() == "Iphone") {
        Geolocation.requestAuthorization();
      }
      this.requestPermission();
    }, 100);
  }

  requestPermission = () => {
    // BackgroundGeolocation.configure({
    //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //   stationaryRadius: 0,
    //   distanceFilter: 100,
    //   interval: 1000,
    //   stopOnTerminate: false,
    //   notificationText: "Location services enabled",
    //   locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER
    // });

    // BackgroundGeolocation.on("activity", activity => {
    //   activity.type = "IN_VEHICLE";
    // });

    // BackgroundGeolocation.headlessTask(async event => {
    //   if (event.name === "location" || event.name === "stationary") {
    //     console.log(JSON.stringify(event.params));
    //     const { tripData } = this.props;
    //     if (tripData.id) {
    //       this.updateLocation(
    //         location.latitude,
    //         location.longitude,
    //         this.address
    //       );
    //     }
    //   }
    // });

    AppPermission.checkPermission(LOCATION_PERMISSION)
      .then(res => {
        AppPermission.requestPermission(LOCATION_PERMISSION).then(res => {
          if (res.status == PERMISSION_AUTHORIZED) {
            try {
              if (getDeviceType() == "Android") {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                  interval: 3000,
                  fastInterval: 5000
                })
                  .then(data => {
                    // BackgroundGeolocation.on("location", location => {
                    //   console.log(
                    //     "location_check ===========================================================" +
                    //       JSON.stringify(location)
                    //   );
                    //   const { tripData } = this.props;
                    //   if (tripData.id) {
                    //     this.updateLocation(
                    //       location.latitude,
                    //       location.longitude,
                    //       this.address
                    //     );
                    //   }
                    // });

                    this.setState({ loading: true });
                    Geolocation.getCurrentPosition(
                      position => {
                        this.getFormatedAddress(position.coords);
                      },
                      error => {
                        // this.requestPermission();
                      },
                      {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 10000
                      }
                    );
                  })
                  .catch(err => { });
              } else {
                // BackgroundGeolocation.on("location", location => {
                //   console.log(
                //     "location_check ===========================================================" +
                //       JSON.stringify(location)
                //   );
                //   const { tripData } = this.props;
                //   if (tripData.id) {
                //     this.updateLocation(
                //       location.latitude,
                //       location.longitude,
                //       this.address
                //     );
                //   }
                // });

                this.setState({ loading: true });
                Geolocation.getCurrentPosition(
                  position => {
                    this.getFormatedAddress(position.coords);
                  },
                  error => {
                    this.requestPermission();
                  },
                  {}
                );
              }

              //Back ground
            } catch (error) {
              console.log(error);
            }
          } else {
            this.btnType = "location";
            this.setState({
              visibleOptionModel: true,
              message: "Location permission is required to go ahead!"
            });
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getFormatedAddress(coords) {
    this.setState({ loading: false });
    this.location = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      title: "You are here!",
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      tintColor: "red"
    };
    const { tripData } = this.props;
    if (tripData.id) {
      this.updateLocation(coords.latitude, coords.longitude, this.address);
    }
    if (this.start) {
      this.startTrip();
    }

    // this.setState({ loading: true });
    // RestAPI.create()
    //   .getAddress(coords)
    //   .then(response => {
    //     this.location = {
    //       lat: coords.latitude,
    //       lon: coords.longitude
    //     };
    //     this.address = response.data.results[0].formatted_address;
    //     const { tripData } = this.props;
    //     if (tripData.id) {
    //       this.updateLocation(coords.latitude, coords.longitude, this.address);
    //     }
    //     this.setState({ loading: false });
    //     if (this.start) {
    //       this.startTrip();
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       visibleModel: true,
    //       loading: false,
    //       message: "Can't get location, Try again."
    //     });
    //   });
  }

  updateLocation(lat, lng, address) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const { userData } = this.props;
        const { tripData } = this.props;

        let data = {
          TripID: tripData.id,
          update_latitude: lat,
          update_longitude: lng
        };

        // console.log(data);
        if (tripData.id) {
          // Api.create(this.props.userData.vAuthToken)
          //   .updateLocation(data)
          //   .then(response => {
          //     console.log(response);
          //   })
          //   .catch(error => {
          //     console.error(error);
          //   });
        }
      } else {
      }
    });
  }

  okayPress = () => {
    this.setState({ visibleOptionModel: false });
    if (this.btnType == "location") {
      this.requestPermission();
    }
  };

  cancelPress = () => {
    this.setState({ visibleOptionModel: false });
    if (this.btnType == "location") {
      this.props.navigation.goBack();
    }
  };

  onModelClose = () => {
    this.setState({ visibleModel: false });
    if (this.statusCode == UNAUTHORIZED) {
      gotoLogin(this.props);
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <LoadingScreen loading={this.state.loading} />
        <MyAlertDialog
          message={this.state.message}
          visibleModel={this.state.visibleModel}
          onPress={this.onModelClose}
        />
        <MyAlertDialogOption
          message={this.state.message}
          visibleModel={this.state.visibleOptionModel}
          okayPress={this.okayPress}
          cancelPress={this.cancelPress}
        />
        <MyHeader
          title={"START TRIP"}
          header={true}
          navigation={this.props.navigation}
        />
        <KeyboardAwareScrollView
          style={{ backgroundColor: colors.white }}
          keyboardShouldPersistTaps={"always"}
        >
          <View style={styles.container}>
            <Text
              style={{
                margin: 20,
                color: colors.lightBlack,
                fontSize: 16
              }}
            >
              Start your trip with sos. To trace your location from start to end
              trip, We will need your location. So make sure you have turn on
              your location.
            </Text>
            <MyTextInput
              placeholder={"Name of Visitor"}
              isValid={this.state.isValidVisitor}
              errorMessage={"Enter Visitor Name"}
              text={this.state.visitorName}
              onTextChange={this.onNameTextChange.bind(this)}
              Icon={Entypo}
              iconSize={16}
              iconName={"user"}
              containerStyle={{ marginTop: 10 }}
              iconColor={"#666"}
            />

            <MyTextInput
              placeholder={"Visitor Contact Number"}
              isValid={this.state.isValidContact}
              errorMessage={"Enter Contact Number"}
              text={this.state.visitorContact}
              onTextChange={this.onNumberTextChange.bind(this)}
              Icon={FontAwesome}
              iconSize={23}
              maxLength={10}
              keyboardType={"phone-pad"}
              iconName={"mobile-phone"}
              iconColor={"#666"}
            />

            <TouchableOpacity
              onPress={() => {
                this.validate();
              }}
              style={{ alignSelf: "center" }}
            >
              <Image
                style={{
                  height: 60,
                  width: 60,
                  alignSelf: "center",
                  marginTop: 25
                }}
                source={images.tripStart}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  validate = () => {
    if (this.state.visitorName == "") {
      this.setState({ isValidVisitor: false });
    } else if (this.state.visitorContact == "") {
      this.setState({ isValidContact: false });
    } else {
      if (this.location.latitude) {
        this.startTrip();
        // this.props.navigation.navigate(TRIP_MAP_VIEW);
      } else {
        this.start = true;
        this.requestPermission();
      }
    }
  };
  startTrip = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const { userData } = this.props;
        var CurrentDate = Moment().format();

        // let data = {
        //   org_id: userData.user_org_id,
        //   user_id: userData.user_id,
        //   customer_name: this.state.visitorName,
        //   customer_phone: this.state.visitorContact,
        //   trip_fromaddress: this.address,
        //   trip_toaddress: "",
        //   trip_fromlocation: this.location,
        //   trip_tolocation: {
        //     lat: "",
        //     lon: ""
        //   },
        //   device_type: getDeviceType(),
        //   trip_deviceinfo: getDeviceInfo()
        // };
        let info = getDeviceInfo();
        let data = {
          complaintID: "",
          from_lat: this.location.latitude,
          from_long: this.location.longitude,
          device_info: info,
          visitor_name: this.state.visitorName,
          visitor_mobile: this.state.visitorContact
        };
        this.setState({ loading: true });
        Api.create(this.props.userData.vAuthToken)
          .startTrip(data)
          .then(response => {
            this.setState({ loading: false });
            let res = response.data;
            this.statusCode = res.status_code;
            if (res.error_code == 1) {
              // BackgroundGeolocation.checkStatus(status => {
              //   if (!status.isRunning) {
              //     BackgroundGeolocation.start(); //triggers start on start event
              //   }
              // });

              let updateLocationData = {
                latitude: this.location.latitude,
                longitude: this.location.longitude,
                title: "You are here!",
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                tintColor: "red"
              };
              let locationList = []
              locationList.push(updateLocationData)
              this.props.updateLocation(locationList);

              this.props.startTrip(res.data);
              this.props.navigation.goBack();
              this.props.navigation.navigate(TRIP_MAP_VIEW);
            } else if (res.error_code == 0 && res.status_code == 401) {
              this.setState({
                visibleModel: true,
                message: res.message
              });
            } else {
              this.setState({
                visibleModel: true,
                message: res.message
              });
            }
          })
          .catch(error => {
            this.setState({
              visibleModel: true,
              loading: false,
              message: error.message
            });
          });
      } else {
        this.setState({
          visibleModel: true,
          message: Locals.noInternet
        });
      }
    });
  };

  onNameTextChange = text => {
    if (text.trim() == "") {
      this.setState({
        visitorName: text,
        isValidVisitor: false
      });
    } else {
      this.setState({ visitorName: text, isValidVisitor: true });
    }
  };
  onNumberTextChange = text => {
    if (text.trim() == "") {
      this.setState({ visitorContact: text, isValidContact: false });
    } else {
      this.setState({ visitorContact: text, isValidContact: true });
    }
  };
}

const mapStateToProps = state => ({
  userData: state.loginReducer,
  tripData: state.startTripReducer
});

const mapDispatchToProps = dispatch => ({
  startTrip: startTripReducer => {
    dispatch(startTrip(startTripReducer));
  },
  updateLocation: location => {
    dispatch(updatedLocation(location));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StartTrip);