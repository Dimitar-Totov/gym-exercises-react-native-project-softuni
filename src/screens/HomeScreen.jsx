import { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { X } from 'lucide-react-native';

import ExcercisesHomepage from '../components/ExcercisesHomepage';
import PopularExercises from '../components/PopularExercises';
import { useExercises } from '../contexts/exercises/useExercises';

export default function HomeScreen({ navigation }) {
    const [text, setText] = useState('');
    const [searchedExercises, setSearchedExercises] = useState([]);
    const { getExerciseByInput, getThreeMostLikedExercises } = useExercises();
    const [threeMostLiked, setThreeMostLiked] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const data = await getThreeMostLikedExercises();
                setThreeMostLiked(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        load()
    }, [])

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            const result = await getExerciseByInput(text);
            setSearchedExercises(result);
            setLoading(false)
        }
        loadData();
    }, [text]);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={[]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView keyboardDismissMode="on-drag">
                        <View style={styles.mainContainer}>
                            <View>
                                <Text style={styles.welcomeHeader}>Your goals start here. Let's crush them</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <View style={{ height: 380, width: 380 }}>
                                    <Image style={styles.welcomeImage} source={require('../../assets/homescreen.png')} />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 25, width: '100%' }}>
                                <TextInput onChangeText={setText} value={text} placeholder='Search about some exercise' style={styles.homescreenSearch} />
                                {text ?
                                    <TouchableOpacity style={styles.clearInput} hitSlop={10} onPress={() => setText('')}>
                                        <X />
                                    </TouchableOpacity>
                                    : ''
                                }
                                {loading && <ActivityIndicator size={40} color="#21ef21" />}
                                {text ? <ExcercisesHomepage searching={searchedExercises} /> : ''}
                            </View>
                            <PopularExercises navigation={navigation} mostLiked={threeMostLiked} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        marginTop: 60
    },
    welcomeHeader: {
        fontSize: 28,
        fontFamily: 'serif',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    welcomeImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    homescreenSearch: {
        backgroundColor: 'white',
        width: '92%',
        height: 45,
        marginBottom: 25,
        paddingLeft: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    clearInput: {
        position: 'absolute',
        top: 11,
        right: 30,
    }
})