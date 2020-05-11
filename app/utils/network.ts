import NetInfo from "@react-native-community/netinfo"

class NetworkHelper {
    public isConnected = false

    unsubscribe = NetInfo.addEventListener(state => {
        this.isConnected = state.isConnected ?? false
    })
}

export default new NetworkHelper()
