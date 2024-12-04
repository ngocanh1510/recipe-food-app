
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { StyleSheet } from 'react-native';

const VideoPlayer = ({ videoSource }) => {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    return (
        <VideoView 
            style={styles.video} 
            player={player}
            allowsFullscreen
        />
    );
};

const styles = StyleSheet.create({
    video: {
        width: 350,
        height: 275,
    }
});

export default VideoPlayer;