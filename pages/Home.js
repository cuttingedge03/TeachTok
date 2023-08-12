// UserComponent.js
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, View, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import * as service from '../network/service';
import QuestionComponent from './QuestionComponent';

const Home = () => {
    const [images, setImages] = useState([require("../images/bg1.png"), require("../images/bg2.png")]); // Static images
    const [selectedButton, setSelectedButton] = useState(0);
    const [text, setQuestionText] = useState('');
    const [followingResponse, setFollowingResponse] = useState(null);
    const [forYouResponse, setForYouResponse] = useState(null);
    const screenHeight = Dimensions.get('window').height - 50;

    const addImage = () => {
        const newImage = images.length % 2 === 0 ? require("../images/bg1.png") : require('../images/bg2.png'); // Interchange images
        setImages(prevImages => [...prevImages, newImage]);
    };

    const fetchData = async () => {
        try {
            // Replace with your API endpoint
            const response = await axios.get('https://example.com/api/getImageUrl');
            const newImageUrl = response.data.imageUrl; // Adjust based on the API response structure
            setImages(prevImages => [...prevImages, newImageUrl]);
        } catch (error) {
            console.error(error);
        }
    };

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        selectedButton === 0 ?
        service.getFollowing()
            .then(response => {
                setFollowingResponse(response)
                setQuestionText(response.flashcard_front)
            })
            .catch(error => console.error(error)) : 
            service.getForYou()
            .then(response => {
                setForYouResponse(response)
            })
            .catch(error => console.error(error));
    }, [selectedButton]);


    const formatTime = (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        return `${Math.floor(seconds / 3600)}h`;
    };


    const handleQuestionPress = () => {
        setQuestionText(text === followingResponse.flashcard_back ? followingResponse.flashcard_front : followingResponse.flashcard_back);
    };

    return (
        <View style={styles.outer}>
        
        <FlatList
                data={images}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Image
                            source={item}
                            style={styles.image}
                        />
                        <QuestionComponent response = {followingResponse} />
                        <Image source={selectedButton === 0 ? require('../images/action_bar2.png') : require('../images/action_bar.png')} style={styles.icon} />
                        <View style={styles.playlistContainer}>
                        <Image source={require('../images/arrow.png')} style={styles.playlistRightImage} />
                        <View style={styles.playlistTextContainer}>
                            <Image
                                source={require('../images/video.png')}
                                style={styles.playlistLeftImage}
                            />
                            <Text style={styles.playlistText}>Playlist · Unit 5: {followingResponse === null ? "" : followingResponse.playlist}</Text>
                        </View>
                        </View>
                    </View>
                )}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                onEndReached={addImage} // Call the API again when user scrolls to the end
                onEndReachedThreshold={0} // Adjust this value based on when you want to trigger the API call
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outer: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '100%', // Full screen height
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullScreenOverlay: {
        position: 'absolute',
        width: '100%',
        height: '20%',
      },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute', // Position the image in the background
        resizeMode: 'cover', // Cover the whole screen
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    icon: {
        position: 'absolute',
        maxHeight: '50%',
        bottom: 85,
        right: -15,
        resizeMode: 'contain',
    },
    topRightIcon: {        
        width: 16,
        height: 16,
        right: 20,
        zIndex: 1,
    },
    topleftIcon: {
        width: 16,
        height: 16,
        zIndex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 1,
    },
    button: {
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    selectedButton: {
        paddingHorizontal: 10,
        borderBottomWidth: 4,
        paddingBottom: 5,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    selectedButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    timerContainer: {
        position: 'absolute',
        top: 24,
        left: 20,
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'white',
    },
    playlistTextContainer: {
        backgroundColor: 'black',
        width: Dimensions.get('window').width, // Takes the full width
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center vertically
    },
    playlistLeftImage: {
        width: 16,
        height: 16,
        marginHorizontal: 5,
    },
    playlistRightImage: {
        width: 16,
        height: 16,
        position: 'absolute',
        right: 10,
        zIndex:1,
        top: 10,
    },
    playlistText: {
        color: 'white',
        padding: 10,
        fontSize: 12,
    },
    playlistContainer: {
        position: 'absolute',
        bottom: 50, // Aligns view to the bottom of the container
        left: 0,
        right: 0,
        backgroundColor: 'black', // Just for visualization
      },

});

export default Home;

