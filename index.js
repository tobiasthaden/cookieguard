import Cookieguard from './src/Cookieguard.js';
export default Cookieguard;

import AbstractService from './src/services/Service.js';
export const Service = AbstractService;

import ETrackerService from './src/services/ETracker.js';
export const ETracker = ETrackerService;

import GoogleAnalyticsService from './src/services/GoogleAnalytics.js';
export const GoogleAnalytics = GoogleAnalyticsService;

import FacebookPixelService from './src/services/FacebookPixel.js';
export const FacebookPixel = FacebookPixelService;

import InstagramEmbedService from './src/services/InstagramEmbed.js';
export const InstagramEmbed = InstagramEmbedService;

import YoutubeEmbedService from './src/services/YoutubeEmbed.js';
export const YoutubeEmbed = YoutubeEmbedService;
