import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";

import { X } from "lucide-react-native";

export default function UserWeightModal({ onClose, username }) {


    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.kilogramsContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{username}'s Weight Tracker</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={28} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.lastWeightSection}>
                            <Text style={{ fontSize: 20, color: '#434242' }}>Your last weight:</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3e3e3e' }}>78kg's</Text>
                        </View>
                    </View>
                    <View style={styles.submitContainer}>
                        <TextInput keyboardType="numeric" style={styles.addWeightInput} placeholder="Enter your current weight in kilograms" />
                        <TouchableOpacity style={styles.button}><Text style={{fontWeight: '500'}}>Add</Text></TouchableOpacity>
                    </View>
                    <View style={styles.weightHistorySection}>
                        <View style={{alignItems: 'center',gap: 15}}>
                            <Text style={{fontSize: 16,fontWeight: '500'}}>Do you want to see your weight history ?</Text>
                            <TouchableOpacity style={styles.button}><Text style={{fontWeight: '500'}}>Click Here</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 20,
        zIndex: 1,
        justifyContent: 'center'
    },
    kilogramsContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#222",
    },
    content: {
        paddingVertical: 10,
        gap: 30,
        alignItems: 'center'
    },
    lastWeightSection: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderWidth: 2,
        borderBlockColor: '#8ef495',
        borderLeftColor: '#a1f1db',
        borderRightColor: '#a1f1db',
        borderRadius: '100%',
    },
    addWeightInput: {
        borderBottomColor: '#80f490',
        borderBottomWidth: 1
    },
    label: {
        fontWeight: 'bold',
        color: '#4f4e4e',
        fontSize: 17,
        marginBottom: 5,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#858484',
        borderRadius: 10,
        padding: 17
    },
    submitContainer: {
        marginBlock: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#78e769',
        paddingInline: 20,
        paddingBlock: 10,
        borderRadius: 15,
    },
    showPassword: {
        position: 'absolute',
        right: 15,
        top: 44,
    },
    errorMessage: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    weightHistorySection: {

    },

});