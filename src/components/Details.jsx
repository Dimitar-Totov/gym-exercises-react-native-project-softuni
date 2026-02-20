import { Image, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";

import { ThumbsUp, ThumbsDown, MessageCircle, SendHorizonal } from 'lucide-react-native';

import * as data from '../data/data.json'
import { useState } from "react";

export default function Details({ route }) {
    const { title } = route.params;
    const exercise = data.exercises.find(exercise => exercise.title == title);
    const [commentButtonClick, setCommentButtonClicked] = useState(false);
    const [commentInput, setCommentInput] = useState('')

    const commentClickHandler = () => {
        setCommentButtonClicked(!commentButtonClick)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.welcomeHeader}>{exercise.title}</Text>
                    <Image source={{ uri: exercise.imageUrl }} style={styles.exerciseImage} />
                    <View style={styles.infoSection}>
                        <Text style={{ lineHeight: 30, fontSize: 25, color: '#4f4c4c', textAlign: 'center' }}>{exercise.description}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <ThumbsUp size={35} />
                        <ThumbsDown size={35} />
                        <MessageCircle size={35} onPress={commentClickHandler} />
                    </View>
                    {commentButtonClick &&
                        <View style={styles.writingCommentSection}>
                            <TextInput onChangeText={setCommentInput} value={commentInput} placeholder="Share your thoughts about this exercise..." />
                            <SendHorizonal />
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center'
    },
    welcomeHeader: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#656565',
    },
    exerciseImage: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },
    infoSection: {
        backgroundColor: '#fff',
        padding: 25,
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'space-around',
        paddingBottom: 15
    },
    writingCommentSection: {
        width: '99%',
        alignItems: 'center',
        paddingBlock: 10,
        paddingInline: 16,
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: 'row',
        marginBlock: 5,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
    }
})