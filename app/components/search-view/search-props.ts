import { ImageStyle, ViewStyle } from "react-native"

export interface SearchProps {
    /**
     * Style overrides for the icon image
     */
    style?: ImageStyle

    /**
     * Style overrides for the icon container
     */

    containerStyle?: ViewStyle

    /**
     * The name of the icon
     */

    onCameraPress?(): void

    onGoPress?(): void
}
