## Adaptive Bitrate (ABR)

### Overview

The playback quality during play-out of a stream is determined by the ABR algorithm.
On starting play-out of a stream, the ABR *strategy* determines which quality to prefer, while during play-out the network's bandwidth is
monitored to select an optimal quality.

More information on ABR can be found on our
[THEOplayer website](https://www.theoplayer.com/blog/abr-bandwidth-usage)
and [demo page](https://www.theoplayer.com/theoplayer-demo-optimized-video-abr).

In this document we will outline how to affect the ABR algorithm, setting a preferred quality or set of qualities and
subscribe to related events.

### ABR Configuration

The `abrConfig` property on `THEOplayerView` determines which initial quality the player will download, depending
on the chosen strategy, as well as various parameters of the playback buffer.

```tsx
const abrConfig: ABRConfiguration = {
  strategy: 'quality',
  targetBuffer: 20,
  bufferLookbackWindow: 30,
  maxBufferLength: 30
}

<THEOplayerView
  config={playerConfig}
  abrConfig={abrConfig}
/>
```

| Property               | Description                                                                                                                                                     | Supported Platforms |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `strategy`             | The adaptive bitrate strategy. Possible values are `'performance'`, `'quality'`, `'bandwidth'` or a `ABRStrategyConfiguration` object. Default is **bandwidth** | Android & Web       |
| `targetBuffer`         | The amount that the player should buffer ahead of the current playback position, in seconds. Default is **20**s.                                                | Android & Web       |
| `bufferLookbackWindow` | The amount of data which the player should keep in its buffer before the current playback position, in seconds. Default is **30**s.                             | Web                 |
| `maxBufferLength`      | The maximum length of the player's buffer, in seconds.                                                                                                          | Web                 |                 |

When specifying the strategy, apart from the values `'performance'`, `'quality'`, `'bandwidth'`, an `ABRStrategyConfiguration`
object can be set with an estimate for the initial bitrate value (in bits per second):

```typescript
const strategyConfig: ABRStrategyConfiguration = {
  type: 'bandwidth',
  metadata: {
    'bitrate': 1200000
  }
}
const abrConfig = {
    strategy: strategyConfig
}
```

### Setting Target Video Quality

By default, the ABR algorithm will choose, depending on the available bandwidth,
from all the video qualities that are available in the manifest or playlist.

It is possible to set a specific quality, or subset of qualities, that should be retained as
a source set by passing the `uid` to the `targetVideoQuality` property.

```tsx
const selectedVideoQuality: number | number[] | undefined = [33, 34, 35]

<THEOplayerView
  config={playerConfig}
  targetVideoQuality={selectedVideoQuality}
/>
```

### Subscribing to track events

The `onMediaTrackListEvent` and `onMediaTrackEvent` callback properties on `THEOplayerView` provide a way to perform actions
when the track list is modified, or when a track's current quality changes:

| Event name              | Event                                                                                                                                                         | Supported Platforms |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `onMediaTrackListEvent` | when a media track list event occurs, for `trackType` with value `Audio` or `Video`, and event `type` with values `AddTrack`, `RemoveTrack` or `ChangeTrack`. | Android & Web       |
| `onMediaTrackEvent`     | when a media track event occurs, for `trackType` with value `Audio` or `Video`, and event `type`, which currently is only `ActiveQualityChanged`.             | Android & Web       |


#### Setting a preferred video quality across period switches and discontinuities

Subscribing to the `AddTrack` event on `onMediaTrackListEvent` for video tracks makes it possible set a
fixed preferred video quality, even when a stream's track list changes due to a DASH period switch or an
HLS discontinuity (for example during an ad break).

```tsx
function usePreferredTargetQuality(preferredBandwidth: number): [number | undefined, (event: MediaTrackListEvent) => void] {
  const [targetVideoQuality, setTargetVideoQuality] = useState<number | undefined>(undefined);

  // Subscribe to track list events
  const onMediaTrackListEvent = (event: MediaTrackListEvent) => {
    const {type, track, trackType} = event;
    if (event.trackType === MediaTrackType.Video && event.type === TrackListEventType.AddTrack) {
      const {qualities, activeQuality: currentActiveQuality} = track;

      // Try to set a preferreed quality
      const targetQuality = qualities.find(q => q.bandwidth === preferredBandwidth);
      if (targetQuality) {
        const {uid} = targetQuality;
        setTargetVideoQuality(uid);
      }
    }
  };
  return [targetVideoQuality, onMediaTrackListEvent];
}

<THEOplayerView
  onMediaTrackListEvent={onMediaTrackListEvent}
/>
```
