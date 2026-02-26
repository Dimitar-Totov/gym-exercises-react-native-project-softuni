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

import { ThumbsUp, MessageCircle } from 'lucide-react-native';

import { useState, useEffect, useRef } from "react";
import { useExercises } from "../contexts/exercises/useExercises";
import { useAuth } from "../contexts/auth/useAuth";
import ExerciseComments from "./ExerciseComments";
import { useLikes } from "../hooks/useLikes";
import { useComments } from "../hooks/useComments";

export default function Details({ route }) {
    const { exerciseId } = route.params;
    const {
        getExerciseById,
        toggleLikes
    } = useExercises();
    const { authState } = useAuth();
    const [exercise, setExercise] = useState(null);
    const [commentButtonClick, setCommentButtonClicked] = useState(false);
    const scrollViewRef = useRef(null);
    const [likesCount, setLikesCount] = useState(0)

    const likes = useLikes(exerciseId);
    const comments = useComments(exerciseId);

    const isLiked = likes.includes(authState.user?.id);

    const commentClickHandler = () => {
        setCommentButtonClicked(!commentButtonClick)
    }

    useEffect(() => setLikesCount(likes.length), [likes])

    useEffect(() => {
        async function fetchExercise() {
            try {
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

    const likePressHandler = async () => {
        await toggleLikes(exerciseId, authState.user?.id);
    }

    return (
        <>
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
                                    <View>
                                        <TouchableOpacity onPress={likePressHandler} disabled={!authState.user}><ThumbsUp size={35} color={isLiked ? '#fff' : '#323232'} fill={isLiked ? '#1d4dd3' : 'none'} /></TouchableOpacity>
                                        <Text style={styles.countBadge}>{likesCount}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={commentClickHandler}><MessageCircle size={35} /></TouchableOpacity>
                                        <Text style={styles.countBadge}>{comments.length}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            {commentButtonClick && <ExerciseComments onClose={commentClickHandler} exerciseId={exerciseId} commentsData={comments} />}
        </>
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
    countBadge: {
        position: 'absolute',
        bottom: -15,
        right: -10,
        color: '#444343',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'serif',
    }
})