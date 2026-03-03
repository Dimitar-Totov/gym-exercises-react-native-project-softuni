import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
} from "react-native";
import { useEffect, useState } from "react";

import { X } from "lucide-react-native";

import { addWeight, getWeights } from "../services/weightService";
import { useLastWeight } from "../hooks/useLastWeight";

export default function UserWeightModal({ onClose, userData }) {
    const [currentWeight, setCurrentWeight] = useState(0);
    const [allWeights, setAllWeights] = useState([]);
    const [error, setError] = useState('');
    const lastWeight = useLastWeight(userData.id);

    const addWeightPressHandler = async () => {
        if (currentWeight <= 0) {
            setError('Please enter valid kilograms')
            setTimeout(() => setError(''), 4000)
            return;
        };

        try {
            const date = new Date().toISOString().split("T")[0];
            await addWeight(userData.id, date, currentWeight);
            setCurrentWeight(0)
        } catch (error) {
            setError(error.message);
        }
    }

    const listAllWeightsPressHandler = async () => {
        try {
            const result = await getWeights(userData.id)
            setAllWeights(result);
        } catch (error) {
            setError(error.message)
        }
    }

    const renderItem = ({ item }) => (
        <View
            style={{
                padding: 15,
                borderBottomWidth: 1,
                borderColor: "#ddd",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <Text style={{ fontSize: 16 }}>{item.date}</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.weight} kg
            </Text>
        </View>
    );
    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.kilogramsContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{userData.username}'s Weight Tracker</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={28} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.lastWeightSection}>
                            <Text style={{ fontSize: 20, color: '#434242' }}>Your last weight:</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3e3e3e' }}>{lastWeight.weight}kg's</Text>
                        </View>
                    </View>
                    <View style={styles.submitContainer}>
                        <TextInput keyboardType="numeric" value={currentWeight} onChangeText={setCurrentWeight} style={styles.addWeightInput} placeholder="Enter your current weight in kilograms" />
                        <TouchableOpacity onPress={addWeightPressHandler} style={styles.button}><Text style={{ fontWeight: '500' }}>Add</Text></TouchableOpacity>
                        {error && <Text style={styles.error}>{error}</Text>}
                    </View>
                    <View style={styles.weightHistorySection}>
                        <View style={{ alignItems: 'center', gap: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Do you want to see your weight history ?</Text>
                            <TouchableOpacity onPress={listAllWeightsPressHandler} style={styles.button}><Text style={{ fontWeight: '500' }}>Click Here</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.flatlistWrapper}>
                        <FlatList
                            data={allWeights}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
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
        borderBottomWidth: 1,
        width: '75%'
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
    flatlistWrapper: {
        height: 200
    },
    error: {
        position: 'absolute',
        bottom: -25,
        left: 36,
        color: 'red',
        fontWeight: '500'
    }
});