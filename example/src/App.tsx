import * as React from 'react';

import { VideoPlayer } from './components/videoplayer/VideoPlayer';
import type { PlayerConfiguration } from 'react-native-theoplayer';
import { EzdrmFairplayContentProtectionIntegrationFactory } from './drm/ezDrm/EzDrmFairplayContentProtectionIntegrationFactory';
import { ContentProtectionRegistry } from 'react-native-theoplayer';
import { TitaniumFairplayContentProtectionIntegrationFactory } from './drm/titaniumDrm/TitaniumFairplayContentProtectionIntegrationFactory';
import { TitaniumWidevineContentProtectionIntegrationFactory } from './drm/titaniumDrm/TitaniumWidevineContentProtectionIntegrationFactory';
import { TitaniumPlayReadyContentProtectionIntegrationFactory } from './drm/titaniumDrm/TitaniumPlayReadyContentProtectionIntegrationFactory';
import { VerimatrixCoreDrmWidevineContentProtectionIntegrationFactory } from './drm/verimatrixCoreDrm/VerimatrixCoreDrmWidevineContentProtectionIntegrationFactory';
import { VerimatrixCoreDrmFairplayContentProtectionIntegrationFactory } from './drm/verimatrixCoreDrm/VerimatrixCoreDrmFairplayContentProtectionIntegrationFactory';
import { VerimatrixCoreDrmPlayReadyContentProtectionIntegrationFactory } from './drm/verimatrixCoreDrm/VerimatrixCoreDrmPlayReadyContentProtectionIntegrationFactory';

const playerConfig: PlayerConfiguration = {
  // Get your THEOplayer license from https://portal.theoplayer.com/
  // Without a license, only demo sources hosted on '*.theoplayer.com' domains can be played.
  license: undefined,
  chromeless: true,
  libraryLocation: 'theoplayer',
  cast: {
    chromecast: {
      appID: 'CC1AD845',
    },
    strategy: 'auto',
  },
};

ContentProtectionRegistry.registerContentProtectionIntegration('ezdrmCustom', 'fairplay', new EzdrmFairplayContentProtectionIntegrationFactory());
ContentProtectionRegistry.registerContentProtectionIntegration(
  'titaniumdrmCustom',
  'fairplay',
  new TitaniumFairplayContentProtectionIntegrationFactory(),
);
ContentProtectionRegistry.registerContentProtectionIntegration(
  'titaniumdrmCustom',
  'widevine',
  new TitaniumWidevineContentProtectionIntegrationFactory(),
);
ContentProtectionRegistry.registerContentProtectionIntegration(
  'titaniumdrmCustom',
  'playready',
  new TitaniumPlayReadyContentProtectionIntegrationFactory(),
);
ContentProtectionRegistry.registerContentProtectionIntegration(
  'verimatrixcoredrmCustom',
  'widevine',
  new VerimatrixCoreDrmWidevineContentProtectionIntegrationFactory(),
);
ContentProtectionRegistry.registerContentProtectionIntegration(
  'verimatrixcoredrmCustom',
  'playready',
  new VerimatrixCoreDrmPlayReadyContentProtectionIntegrationFactory(),
);
ContentProtectionRegistry.registerContentProtectionIntegration(
  'verimatrixcoredrmCustom',
  'fairplay',
  new VerimatrixCoreDrmFairplayContentProtectionIntegrationFactory(),
);

export default function App() {
  return <VideoPlayer config={playerConfig} />;
}
