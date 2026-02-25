import {
    Image,
    StyleSheet,
    Text, View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    ActivityIndicator
} from "react-native";

import { ThumbsUp, ThumbsDown, MessageCircle, SendHorizonal } from 'lucide-react-native';

import { useState, useEffect, useRef } from "react";
import { useExercises } from "../contexts/exercises/useExercises";

export default function Details({ route }) {
    const { exerciseId } = route.params;
    const { getExerciseById } = useExercises();
    const [exercise, setExercise] = useState(null);
    const [commentButtonClick, setCommentButtonClicked] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const scrollViewRef = useRef(null);
    const commentInputRef = useRef(null);

    const commentClickHandler = () => {
        setCommentButtonClicked(!commentButtonClick)
    }

    useEffect(() => {
        async function fetchExercise() {
            const result = await getExerciseById(exerciseId);
            setExercise(result);
        }

        fetchExercise();
    }, [exerciseId]);

    useEffect(() => {
        if (commentButtonClick) {
            const timer = setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
                commentInputRef.current?.focus();
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [commentButtonClick]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.container}
        >
            <ScrollView
                keyboardDismissMode="on-drag"
                ref={scrollViewRef}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        {!exercise ? (
                            <ActivityIndicator style={{ marginTop: 40 }} size={40} color="#21ef21" />
                        ) : (
                            <>
                                <Text style={styles.welcomeHeader}>{exercise?.name}</Text>
                                <Image source={{ uri: exercise?.['image-url'] }} style={styles.exerciseImage} />
                                <View style={styles.infoSection}>
                                    <Text style={{ lineHeight: 30, fontSize: 25, color: '#4f4c4c', textAlign: 'center' }}>
                                        {exercise?.description}
                                    </Text>
                                </View>
                                <View style={styles.buttons}>
                                    <ThumbsUp size={35} />
                                    <ThumbsDown size={35} />
                                    <MessageCircle size={35} onPress={commentClickHandler} />
                                </View>
                                {commentButtonClick && (
                                    <View style={styles.writingCommentSection}>
                                        <TextInput
                                            style={{ width: '90%' }}
                                            ref={commentInputRef}
                                            onChangeText={setCommentInput}
                                            value={commentInput}
                                            placeholder="Share your thoughts about this exercise..."
                                        />
                                        <TouchableOpacity>
                                            <SendHorizonal />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView >
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
        marginBlock: 20,
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
        flexDirection: 'row',
        marginBlock: 10,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
    }
})