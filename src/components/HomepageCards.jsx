import { View, Text, StyleSheet } from "react-native"

export default function HomepageCards() {
    return (
        <View style={{ flexDirection: 'row', width: '90%', flexWrap: 'wrap', gap: 30 }}>
            <View style={style.card}><Text style={style.cardText}>Back</Text></View>
            <View style={style.card}><Text style={style.cardText}>Chest</Text></View>
            <View style={style.card}><Text style={style.cardText}>Arms</Text></View>
            <View style={style.card}><Text style={style.cardText}>Legs</Text></View>
            <View style={style.card}><Text style={style.cardText}>Abs</Text></View>
            <View style={style.card}><Text style={style.cardText}>Full-Body</Text></View>
        </View>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: '#7CFC00',
        width: 95,
        height: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600'
    }
})