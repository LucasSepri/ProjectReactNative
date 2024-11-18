import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { hideAsync } from 'expo-splash-screen';
import { useVideoPlayer, VideoView } from 'expo-video';

type Props = {
    onComplete: (status: boolean) => void;
}

export function Splash({ onComplete }: Props) {
    const videoSource = require('../../../assets/splash.mp4');
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = false;
        player.play();
    });

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (player) {
            const onStatusUpdate = () => {
                const status = player.status;

                // Verifica se o vídeo começou a tocar
                if (status === 'readyToPlay' && !isPlaying) {
                    setIsPlaying(true);
                    hideAsync(); // Esconde a splash screen quando o vídeo começa a carregar
                }

                // Verifica se o vídeo terminou de tocar
                if (status === 'idle' && isPlaying) {
                    onComplete(true); // Informa que a splash screen terminou
                }
            };

            player.addListener('playingChange', onStatusUpdate);

            return () => player.removeListener('playingChange', onStatusUpdate);
        }
    }, [player, isPlaying, onComplete]);

    return (
        <View style={styles.container}>
            <VideoView
                style={StyleSheet.absoluteFillObject} // Garante que o vídeo preencha toda a tela
                player={player}
                allowsFullscreen={false} // Desabilita fullscreen
                allowsPictureInPicture={false} // Desabilita picture-in-picture
                nativeControls={false}// Desabilita os controles do vídeo
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Garante que o contêiner ocupe toda a tela
        justifyContent: 'center', // Alinha o conteúdo ao centro, caso necessário
        alignItems: 'center', // Alinha o conteúdo ao centro, caso necessário
        backgroundColor: 'black', // Define fundo preto, caso o vídeo não cubra 100% da tela
    },
});
