/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
// @import GoogleMaps; //add this line if you want to use Google Maps
// [GMSServices provideAPIKey:@"AIzaSyCBQbWeOGDoSi2ixWkcJQu7A8FJtfmA2p8"]; // add this line using the api key obtained from Google Console
@property (nonatomic, strong) UIWindow *window;

@end
