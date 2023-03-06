// THEOplayerRCTView+BackgroundAudioConfig.swift

import Foundation
import THEOplayerSDK

struct BackgroundAudioConfig {
    var enabled: Bool = false
}

extension THEOplayerRCTView: BackgroundPlaybackDelegate {

    func initBackgroundAudio() {
        self.player?.backgroundPlaybackDelegate = self
    }
    
    public func shouldContinueAudioPlaybackInBackground() -> Bool {
        return self.backgroundAudioConfig.enabled
    }
}
