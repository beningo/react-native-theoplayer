import { ActionButton } from './actionbutton/ActionButton';
import type { StyleProp, ViewStyle } from 'react-native';
import React, { PureComponent } from 'react';
import { PlayerEventType } from 'react-native-theoplayer';
import { PlayerContext, UiContext } from '../util/PlayerContext';
import { PlaySvg } from './svg/PlaySvg';

import { PauseSvg } from './svg/PauseSvg';

interface PlayButtonProps {
  style?: StyleProp<ViewStyle>;
}

interface PlayButtonState {
  paused: boolean;
  error: boolean;
}

export class PlayButton extends PureComponent<PlayButtonProps, PlayButtonState> {
  private animationPauseId: number | undefined = undefined;

  constructor(props: PlayButtonProps) {
    super(props);
    this.state = {
      paused: true,
      error: false,
    };
  }

  componentDidMount() {
    const player = (this.context as UiContext).player;
    player.addEventListener(PlayerEventType.PLAY, this.onPlay);
    player.addEventListener(PlayerEventType.PLAYING, this.onPlay);
    player.addEventListener(PlayerEventType.PAUSE, this.onPause);
    player.addEventListener(PlayerEventType.ERROR, this.onError);
    player.addEventListener(PlayerEventType.TIME_UPDATE, this.onTimeupdate);
    this.setState({
      paused: player.paused,
      error: false,
    });
  }

  componentWillUnmount() {
    const player = (this.context as UiContext).player;
    player.removeEventListener(PlayerEventType.PLAY, this.onPlay);
    player.removeEventListener(PlayerEventType.PLAYING, this.onPlay);
    player.removeEventListener(PlayerEventType.PAUSE, this.onPause);
    player.removeEventListener(PlayerEventType.ERROR, this.onError);
    player.removeEventListener(PlayerEventType.SOURCE_CHANGE, this.onSourceChange);
    player.removeEventListener(PlayerEventType.TIME_UPDATE, this.onTimeupdate);
  }

  private onPlay = () => {
    this.setState({ paused: false });
    if (this.animationPauseId !== undefined) {
      const animationController = (this.context as UiContext).ui;
      animationController.setUserIdle_(this.animationPauseId);
      this.animationPauseId = undefined;
    }
  };

  private onPause = () => {
    this.setState({ paused: true });
    if (this.animationPauseId === undefined) {
      const animationController = (this.context as UiContext).ui;
      this.animationPauseId = animationController.setUserActive_();
    }
  };

  private onTimeupdate = () => {
    const player = (this.context as UiContext).player;
    this.setState({ paused: player.paused });
  };

  private onError = () => {
    this.setState({ error: true });
  };

  private onSourceChange = () => {
    const player = (this.context as UiContext).player;
    this.setState({
      paused: player.paused,
      error: false,
    });
  };

  private togglePlayPause = () => {
    const player = (this.context as UiContext).player;
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  render() {
    const { paused, error } = this.state;
    const { style } = this.props;
    if (error) {
      return <></>;
    }

    return (
      <PlayerContext.Consumer>
        {(context: UiContext) => (
          <ActionButton
            style={context.style.controlBar.buttonIcon}
            touchable={true}
            svg={paused ? <PlaySvg /> : <PauseSvg />}
            // @ts-ignore
            iconStyle={[style]}
            onPress={this.togglePlayPause}
          />
        )}
      </PlayerContext.Consumer>
    );
  }
}

PlayButton.contextType = PlayerContext;
