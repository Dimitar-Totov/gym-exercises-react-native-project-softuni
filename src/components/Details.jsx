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
    ActivityIndicator,
} from "react-native";

import { ThumbsUp, ThumbsDown, MessageCircle, SendHorizonal } from 'lucide-react-native';

import { useState, useEffect, useRef } from "react";
import { useExercises } from "../contexts/exercises/useExercises";
import { useAuth } from "../contexts/auth/useAuth";
import ExerciseComments from "./ExerciseComments";

export default function Details({ route }) {
    const { exerciseId } = route.params;
    const { getExerciseById, postExerciseCommentById, getExerciseCommentsById } = useExercises();
    const { authState } = useAuth();
    const [exercise, setExercise] = useState(null);
    const [commentButtonClick, setCommentButtonClicked] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const scrollViewRef = useRef(null);

    const commentClickHandler = () => {
        setCommentButtonClicked(!commentButtonClick)
    }

    useEffect(() => {
        async function fetchExercise() {
            try {
                const comments = await getExerciseCommentsById(exerciseId);
                setComments(comments)
                const result = await getExerciseById(exerciseId);
                setExercise(result);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchExercise();
    }, [exerciseId]);

    useEffect(() => {
        if (commentButtonClick) {
            const timer = setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [commentButtonClick]);

    const postCommentHandler = async () => {
        if (commentInput.length === 0) return;
        try {
            await postExerciseCommentById(exerciseId, authState.user.id, commentInput, authState.user.username);
            setCommentInput('')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView
                keyboardDismissMode="on-drag"
                ref={scrollViewRef}
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
                                    <TouchableOpacity onPress={commentClickHandler}><MessageCircle size={35} /></TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <View style={styles.commentsSection}>
                {commentButtonClick && (
                    <>
                        <ExerciseComments commentsData={comments} onClose={commentClickHandler} exerciseId={exerciseId} />
                        {authState.user &&
                            <View style={styles.writingCommentSection}>
                                <TextInput
                                    style={{ width: '90%' }}
                                    onChangeText={setCommentInput}
                                    value={commentInput}
                                    placeholder="Share your thoughts about this exercise..."
                                />
                                <TouchableOpacity onPress={postCommentHandler}>
                                    <SendHorizonal />
                                </TouchableOpacity>
                            </View>
                        }
                    </>
                )}
            </View>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        backgroundColor: '#fff'
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
        padding: 25,
    },
    buttons: {
        flexDirection: 'row',
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
    },
    commentsSection: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        height: '50%',
        width: '100%',
        justifyContent: 'space-between'
    }
})