import { useMemo, useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as data from '../data/data.json'
import { X } from 'lucide-react-native';

import ExcercisesHomepage from '../components/ExcercisesHomepage';
import HomepageCards from '../components/HomepageCards';
import PopularExercises from '../components/PopularExercises';

export default function HomeScreen() {
    const [text, changeText] = useState('');
    const filteredData = useMemo(() => data.exercises.filter(item => text === '' ? '' : item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())), [text]);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={[]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView keyboardDismissMode="on-drag">
                        <View style={style.mainContainer}>
                            <View>
                                <Text style={style.welcomeHeader}>Your goals start here. Let's crush them</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <View style={{ height: 380, width: 380 }}>
                                    <Image style={style.welcomeImage} source={require('../../assets/homescreen.png')} />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 25, width: '100%' }}>
                                <TextInput onChangeText={changeText} value={text} placeholder='Search about some exercise' style={style.homescreenSearch} />
                                {text ?
                                    <TouchableOpacity style={style.clearInput} hitSlop={10} onPress={() => changeText('')}>
                                        <X />
                                    </TouchableOpacity>
                                    : ''
                                }
                                {text ? <ExcercisesHomepage searchedText={filteredData} /> : <HomepageCards />}
                            </View>
                            <PopularExercises />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
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