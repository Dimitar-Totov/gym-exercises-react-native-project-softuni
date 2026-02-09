import { Text, View, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function PopularExercises({ navigation }) {

    const viewAllPressHandler = () => navigation.navigate('Catalog');

    return (
        <View style={{ justifyContent: 'center', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Popular Exercises</Text>
                <TouchableOpacity onPress={viewAllPressHandler} style={{ backgroundColor: '#65da5a', paddingInline: 15, paddingBlock: 10, borderRadius: 5 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'columns', justifyContent: 'center' }}>
                <View style={style.popularExerciseCardContainer}>
                    <Image style={style.popularExercisesImage} source={require('../../assets/bench-press.jpg')} />
                    <View style={{ flexDirection: 'row', width: '83%', justifyContent: 'space-between' }}>
                        <Text style={style.popularExercisesText}>Bench Press</Text>
                        {/* It has to navigate and all others */}
                        <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic' }}>Learn more...</Text>
                    </View>
                </View>
                <View style={style.popularExerciseCardContainer}>
                    <Image style={style.popularExercisesImage} source={require('../../assets/pull-up.webp')} />
                    <View style={{ flexDirection: 'row', width: '83%', justifyContent: 'space-between' }}>
                        <Text style={style.popularExercisesText}>Pull Up</Text>
                        <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic' }}>Learn more...</Text>
                    </View>
                </View>
                <View style={style.popularExerciseCardContainer}>
                    <Image style={style.popularExercisesImage} source={require('../../assets/squat.jpg')} />
                    <View style={{ flexDirection: 'row', width: '83%', justifyContent: 'space-between' }}>
                        <Text style={style.popularExercisesText}>Squat</Text>
                        <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic' }}>Learn more...</Text>
                    </View>
                </View>
                <View style={style.popularExerciseCardContainer}>
                    <Image style={style.popularExercisesImage} source={require('../../assets/curl.webp')} />
                    <View style={{ flexDirection: 'row', width: '83%', justifyContent: 'space-between' }}>
                        <Text style={style.popularExercisesText}>Curl</Text>
                        <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic' }}>Learn more...</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    popularExerciseCardContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    popularExercisesText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    popularExercisesImage: {
        width: 350,
        height: 350,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10
    },
})