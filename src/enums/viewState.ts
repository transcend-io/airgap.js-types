// main
import { makeEnum } from '@transcend-io/type-utils';

/**
 * Consent Manager view state for the Interactive Advertising Bureau
 */
export const IABViewState = makeEnum({
  /** Transparency and Consent Framework for Europe */
  TCF_EU: 'TCF_EU',
});

/**
 * View States for Transcend's Consent Manager UI
 */
export const InitialTranscendViewState = makeEnum({
  /** expanded and showing quick select options */
  QuickOptions: 'QuickOptions',
  /** three option UI: essential, functional/analytics, advertising */
  QuickOptions3: 'QuickOptions3',
  /** accept all button call to action, with more options in the banner footer */
  AcceptAll: 'AcceptAll',
  /** toggle button that toggles on or off all active purposes in the current regime */
  AcceptAllRejectAllToggle: 'AcceptAllRejectAllToggle',
  /** accept all or more options, both as calls to action */
  AcceptAllOrMoreChoices: 'AcceptAllOrMoreChoices',
  /** accept all or reject all */
  AcceptOrRejectAll: 'AcceptOrRejectAll',
  /** accept all or reject all or more options */
  AcceptOrRejectAllOrMoreChoices: 'AcceptOrRejectAllOrMoreChoices',
  /** accept or reject the Analytics script tag */
  AcceptOrRejectAnalytics: 'AcceptOrRejectAnalytics',
  /** accept or reject the Advertising script tag */
  AcceptOrRejectAdvertising: 'AcceptOrRejectAdvertising',
  /** data collection notice with do not sell */
  NoticeAndDoNotSell: 'NoticeAndDoNotSell',
  /** open a modal that allows for an explanation of do not sell/share, before opting out */
  DoNotSellExplainer: 'DoNotSellExplainer',
  /** open a modal that allows for complete options toggling */
  CompleteOptionsToggles: 'CompleteOptionsToggles',
  /** open a modal that shows a notice that the privacy policy has changed, without any prompt to change consent */
  PrivacyPolicyNotice: 'PrivacyPolicyNotice',
  /**
   * open a modal that shows a notice that the privacy policy has changed, without any prompt to change consent
   * and no button to close the modal. instead there is an X in the top right corner of the modal
   */
  PrivacyPolicyNoticeWithCloseButton: 'PrivacyPolicyNoticeWithCloseButton',
  /** expanded and showing full checkbox options */
  CompleteOptions: 'CompleteOptions',
  /** complete options, but selecting a checkbox means the user is opted out */
  CompleteOptionsInverted: 'CompleteOptionsInverted',
  /** hidden */
  Hidden: 'Hidden',
});

/**
 * Type override
 */
export type InitialTranscendViewState =
  (typeof InitialTranscendViewState)[keyof typeof InitialTranscendViewState];

/**
 * Consent Manager view states that can be used at launch
 */
export const InitialViewState = makeEnum({
  /** View States for Transcend's Consent Manager UI */
  ...InitialTranscendViewState,
  /** View States for IAB Frameworks */
  ...IABViewState,
});

/**
 * Type override
 */
export type InitialViewState =
  (typeof InitialViewState)[keyof typeof InitialViewState];

/**
 * View states that are displayed in response to a user request (e.g. transcend.doNotSell() or )
 */
export const ResponseViewState = makeEnum({
  /** notice that do not sell has been acknowledged properly */
  DoNotSellDisclosure: 'DoNotSellDisclosure',
  /** notice of a 1 click opt out for multiple consent purposes */
  OptOutDisclosure: 'OptOutDisclosure',
});

/**
 * Type override
 */
export type ResponseViewState =
  (typeof ResponseViewState)[keyof typeof ResponseViewState];

/**
 * Consent Manager view states that can be navigated to after initial view state
 */
export const DeepViewState = makeEnum({
  /** language options */
  LanguageOptions: 'LanguageOptions',
});

/**
 * Type override
 */
export type DeepViewState = (typeof DeepViewState)[keyof typeof DeepViewState];

/**
 * Consent Manager view states after it's been dismissed
 */
export const DismissedViewState = makeEnum({
  /** showing and collapsed */
  Collapsed: 'Collapsed',
  /** closed */
  Closed: 'Closed',
});

/**
 * Type override
 */
export type DismissedViewState =
  (typeof DismissedViewState)[keyof typeof DismissedViewState];

/**
 * All possible view states of the Consent Manager
 */
export const ViewState = makeEnum({
  ...InitialViewState,
  ...ResponseViewState,
  ...DeepViewState,
  ...DismissedViewState,
});

/**
 * Type override
 */
export type ViewState = (typeof ViewState)[keyof typeof ViewState];
