import { Text, View, Image } from 'react-native';

export default function ExcercisesHomepage(props) {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            {props.searchedText.length === 0
                ? <Text style={{ fontSize: 25, fontFamily: 'monospace', }}>No matches found</Text>
                : props.searchedText.map(e => (
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
                        <Image style={{ width: 250, height: 200, resizeMode: 'contain' }} source={{ uri: e.imageUrl }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '83%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{e.title}</Text>
                            <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic' }}>Learn more...</Text>
                        </View>
                    </View>
                ))}
        </View>

    )
}