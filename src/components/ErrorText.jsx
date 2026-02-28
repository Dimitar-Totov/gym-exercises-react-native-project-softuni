import { View, Text, StyleSheet } from "react-native";

export default function ErrorText({ errorMessage }) {
    return (
        <View style={[styles.container,{bottom: errorMessage !== 'Password must be at least 6 characters long and include at least uppercase letter, lowercase letter, number, and special character' ? -40 : -90 }]}>
            <Text style={styles.message}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingInline: 40,
    },
    message: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center'
    }
})