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
     * Style overrides for the icon container
     */

    searchInputViewStyle?: ViewStyle

    /**
     * Style overrides for the icon container
     */

    searchTextStyle?: ViewStyle

    /**
     * Style overrides for the icon container
     */

    buttonStyle?: ViewStyle

    /**
     * overrides for having camera icon or not
     */

    cameraIcon?: boolean

    /**
     * The name of the icon
     */

    value?: string
    isLoading?: boolean
    isValidSearch?: boolean

    onCameraPress?(): void
    onChangeText?: (text: string) => void;
    onGoPress?(): void
}
