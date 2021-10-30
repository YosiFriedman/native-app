import React from 'react';
import { View,Text } from 'react-native'

const Confirm = (props) => {
    const confirm = props.route.params
    console.log(confirm)
    return(
        <View>
            <Text>confirm screen</Text>
        </View>

    )
}
export default Confirm;