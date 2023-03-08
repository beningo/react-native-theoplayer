import React, { useEffect, useRef } from 'react';
import type { THEOplayerViewProps } from 'react-native-theoplayer';
import * as THEOplayer from 'theoplayer';
import { THEOplayerWebAdapter } from './adapter/THEOplayerWebAdapter';
import { WebMediaSession } from './adapter/web/WebMediaSession';
import { StyleSheet, View } from 'react-native';

export function THEOplayerView(props: React.PropsWithChildren<THEOplayerViewProps>) {
  const { config, children } = props;
  const player = useRef<THEOplayer.ChromelessPlayer | null>(null);
  const adapter = useRef<THEOplayerWebAdapter | null>(null);
  const mediaSession = useRef<WebMediaSession | null>(null);
  const container = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    // Create player inside container.
    if (container.current) {
      const chromeless = config?.chromeless === true || config?.chromeless === undefined;
      if (chromeless) {
        player.current = new THEOplayer.ChromelessPlayer(container.current, config);
      } else {
        player.current = new THEOplayer.Player(container.current, {
          ...config,
          ui: {
            fluid: true,
          },
          allowNativeFullscreen: true,
        } as THEOplayer.PlayerConfiguration);
      }

      // Prepare the player to ChromelessPlayer.autoplay on platforms where autoplay is restricted without user action.
      player.current.prepareWithUserAction();

      // Adapt native player to react-native player.
      adapter.current = new THEOplayerWebAdapter(player.current);

      // Create media session connector
      mediaSession.current = new WebMediaSession(player.current);

      // Expose players for easy access
      // @ts-ignore
      window.player = adapter.current;

      // @ts-ignore
      window.nativePlayer = player;

      // Notify the player is ready
      props.onPlayerReady?.(adapter.current);
    }

    // Clean-up
    return () => {
      adapter?.current?.destroy();
      mediaSession?.current?.destroy();
      player?.current?.destroy();
    };
  }, [container]);

  // by default stretch the video to cover the container.
  // Override using the 'theoplayer-container' class.
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
    overflow: 'hidden',
  };

  const chromeless = config?.chromeless === undefined || config?.chromeless === true;
  return (
    <View style={StyleSheet.absoluteFill}>
      <div ref={container} style={containerStyle} className={chromeless ? 'theoplayer-container' : 'theoplayer-container video-js theoplayer-skin'} />
      {children}
    </View>
  );
}
