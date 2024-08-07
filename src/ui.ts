// external
import * as t from 'io-ts';

// main
import { ObjByString, applyEnum, valuesOf } from '@transcend-io/type-utils';
import {
  ConsentManagerLanguageKey,
  LanguageKey,
} from '@transcend-io/internationalization';

// local
import {
  ViewState,
  InitialTranscendViewState,
  InitialViewState,
  PrivacyRegimeEnum,
  DismissedViewState,
} from './enums';
import { AirgapAuth, AirgapAuthMap } from './core';
import { NonTcfVendor } from './iab';

/** Transcend Smart Quarantine API (window.transcend) */
export type PreInitTranscendAPI = {
  /** Ready event subscriber */
  ready(callback: (transcend: TranscendAPI) => void): void;
  /** Ready event dispatch queue */
  readyQueue: ((transcend: TranscendAPI) => void)[];
};

/** showConsentManager() */
export interface ShowConsentManagerOptions {
  /** View state */
  viewState?: ViewState;
}

/**
 * Input for fetching a policy from Transcend and inserting template variables
 */
export type GetTranscendPolicies = {
  /** The language to fetch policy for - defaults to currently selected language key */
  locale?: LanguageKey;
  /** Template variables to dynamically inject into the policy */
  variables?: ObjByString;
  /**
   * The UUID of the policies defined in Transcend to fetch
   *
   * This can be pulled from the URL
   * @see https://app.transcend.io/privacy-center/policies
   */
  policyIds?: string[];
  /**
   * The titles of the policies defined in Transcend to fetch
   *
   * This can be pulled from the URL
   * @see https://app.transcend.io/privacy-center/policies
   */
  policyTitles?: string[];
};

/**
 * The returning Transcend policy
 */
export type TranscendPolicy = {
  /** The policy UUID */
  id: string;
  /** The policy title */
  title: string;
  /** The policy content */
  content: string;
};

/**
 * Transcend Consent Manager external methods
 */
export type ConsentManagerAPI = Readonly<{
  /** Possible ViewState values */
  viewStates: Set<ViewState>;
  /** Expose an option to grab the current view state */
  getViewState: () => ViewState;
  /** Get the current active language */
  getTranscendPolicies: (
    input?: GetTranscendPolicies,
  ) => Promise<TranscendPolicy[]>;
  /** Callback that sets any dynamic variables that should be exposed to the consent UI messages */
  setTranscendUiVariables: (variables: ObjByString) => Promise<void>;
  /** Get the current value of Transcend UI variables */
  getTranscendUiVariables: () => ObjByString;
  /** Set consent change authorization key */
  setAuth?: (key: AirgapAuthMap['key']) => void;
  /** Change the current privacy policy URL */
  setPrivacyPolicy: (privacyPolicyLink: string) => void;
  /** Change the current secondary policy URL */
  setSecondaryPolicy: (privacyPolicyLink: string) => void;
  /** Show consent manager unless recently dismissed */
  autoShowConsentManager(options?: ShowConsentManagerOptions): Promise<void>;
  /** Show consent manager */
  showConsentManager(options?: ShowConsentManagerOptions): Promise<void>;
  /** Set the current active language */
  setActiveLocale(locale: ConsentManagerLanguageKey): Promise<void>;
  /** Get the currently active locale */
  getActiveLocale: () => ConsentManagerLanguageKey
  /** Toggle consent manager */
  toggleConsentManager(options?: ShowConsentManagerOptions): Promise<void>;
  /** Hide consent manager */
  hideConsentManager(): Promise<void>;
  /** Opt out of the sale of personal info & show a disclosure */
  doNotSell(
    auth: AirgapAuth,
    options?: ShowConsentManagerOptions,
  ): Promise<void>;
  /** Opt out of all purposes */
  optOutNotice(
    auth: AirgapAuth,
    options?: ShowConsentManagerOptions,
  ): Promise<void>;
  /** Sets local tcf string (does not sync to xdi or preference store) */
  setTCFConsent?: (auth: AirgapAuth, tcString: string) => Promise<void>;
  /** UI version */
  version?: string;
}> &
  EventTarget;

/**
 * `transcend` event types
 */
export type TranscendEventType = 'view-state-change';

/** 'view-state-change' custom event details */
export type ViewStateEventDetails = {
  /** The new, now-current view state */
  viewState: ViewState;
  /** The previous view state */
  previousViewState: ViewState | null;
};

/** Transcend Smart Quarantine API (window.transcend) */
export type TranscendAPI = PreInitTranscendAPI & ConsentManagerAPI;

/**
 * Customer theming
 */
export const ConsentManagerTheme = t.type({
  /** Primary color */
  primaryColor: t.string,
  /** Font color */
  fontColor: t.string,
});

/** Type override */
export type ConsentManagerTheme = t.TypeOf<typeof ConsentManagerTheme>;

/**
 * Mobile-first responsive breakpoints
 * No media query for mobile, which is the default
 */
export const ConsentManagerBreakpoints = t.type({
  /** In px, at or above this width is tablet */
  tablet: t.string,
  /** In px, at or above this width is desktop */
  desktop: t.string,
});

/** Type override */
export type ConsentManagerBreakpoints = t.TypeOf<
  typeof ConsentManagerBreakpoints
>;

/**
 * TODO: https://transcend.height.app/T-19149 - remove
 * @deprecated
 */
export const PrivacyRegimeToInitialViewStateInput = t.partial(
  applyEnum(PrivacyRegimeEnum, () => valuesOf(InitialTranscendViewState)),
);

/**
 * TODO: https://transcend.height.app/T-19149 - remove
 * @deprecated
 */
export type PrivacyRegimeToInitialViewStateInput = t.TypeOf<
  typeof PrivacyRegimeToInitialViewStateInput
>;

/**
 * TODO: https://transcend.height.app/T-19149 - remove
 * @deprecated
 */
export const PrivacyRegimeToInitialViewState = t.record(
  valuesOf(PrivacyRegimeEnum),
  valuesOf(InitialTranscendViewState),
);

/**
 * TODO: https://transcend.height.app/T-19149 - remove
 * @deprecated
 */
export type PrivacyRegimeToInitialViewState = t.TypeOf<
  typeof PrivacyRegimeToInitialViewState
>;

export const ExperienceToInitialViewState = t.record(
  t.string,
  valuesOf(InitialViewState),
);

/** type overload */
export type ExperienceToInitialViewState = t.TypeOf<
  typeof ExperienceToInitialViewState
>;

export const RequiredConsentManagerConfig = t.type({
  /** Customer theming */
  theme: ConsentManagerTheme,
  /** A set of responsive breakpoints */
  breakpoints: ConsentManagerBreakpoints,
  /** The privacy policy URL to redirect to */
  privacyPolicy: t.string,
  /** The secondary policy URL to redirect to */
  secondaryPolicy: t.string,
  /** Custom CSS stylesheet */
  css: t.string,
  /** Path to localizations directory */
  messages: t.string,
  /** What state the consent manager should launch in */
  initialViewStateByPrivacyRegime: ExperienceToInitialViewState,
  /** What state the consent manager should go to when dismissed */
  dismissedViewState: valuesOf(DismissedViewState),
});

/** type overload */
export type RequiredConsentManagerConfig = t.TypeOf<
  typeof RequiredConsentManagerConfig
>;

export const OptionalConsentManagerConfig = t.partial({
  /** The set of enabled languages - CSV of ConsentManagerLanguageKey */
  languages: t.string,
  /** The override value for the consent banner z-index */
  uiZIndex: t.string,
  /**
   * The override value for the consent banner shadow root state
   *
   * Potential values: 'closed' (default) and 'open'
   */
  uiShadowRoot: t.string,
});

/** type overload */
export type OptionalConsentManagerConfig = t.TypeOf<
  typeof OptionalConsentManagerConfig
>;

/** Consent manager UI configuration */
export const ConsentManagerConfig = t.intersection([
  RequiredConsentManagerConfig,
  OptionalConsentManagerConfig,
]);

/** Type override */
export type ConsentManagerConfig = t.TypeOf<typeof ConsentManagerConfig>;

/** Input for Consent manager UI configuration */
export const ConsentManagerConfigInput = t.partial({
  ...OptionalConsentManagerConfig.props,
  ...RequiredConsentManagerConfig.props,
});

/** Type override */
export type ConsentManagerConfigInput = t.TypeOf<
  typeof ConsentManagerConfigInput
>;

export const TCFConfig = t.type({
  /** Path to vendor-list.json */
  vendorList: t.string,
  /** Custom CSS stylesheet */
  css: t.string,
  /** Path to localizations directory */
  messages: t.string,
});

/** Type override */
export type TCFConfig = t.TypeOf<typeof TCFConfig>;

/** Configuration that are passed directly to the TCF module, not via airgap.j */
export const TCFBundledDataConfig = t.partial({
  /** Mapping of TCF Purpose ID to airgap tracking types */
  purposeMap: t.array(t.tuple([t.number, t.array(t.string)])),
  /** These TCF purposes cannot be processed on the basis of legitimate interests */
  restrictLegitimateInterestPurposes: t.array(t.number),
  /** Vendors that Transcend Consent regulates because they haven't registered with IAB TCF */
  nonTcfVendors: t.array(NonTcfVendor),
  /** Comma separated list of languages to support in the UI */
  languages: t.string,
  /** Default locale to use for the UI internationalization  */
  locale: t.string,
  /**
   * Whether or not to enable integration between Google Consent Mode and TCF.
   * More docs here https://developers.google.com/tag-platform/security/guides/implement-TCF-strings#cmp-api
   */
  enableAdvertiserConsentMode: t.boolean,
});

/** Type override */
export type TCFBundledDataConfig = t.TypeOf<typeof TCFBundledDataConfig>;

/** Input for Consent manager UI configuration */
export const TCFConfigInput = t.partial(TCFConfig.props);

/** Type override */
export type TCFConfigInput = t.TypeOf<typeof TCFConfigInput>;

/**
 * Properties exposed on `self` by the Transcend Smart Quarantine
 */
export type TranscendView = Window & {
  /** Transcend Smart Quarantine API */
  transcend: TranscendAPI;
};

export const DEFAULT_VIEW_STATE_BY_PRIVACY_REGIME: ExperienceToInitialViewState =
  {
    // EU
    GDPR: InitialViewState.QuickOptions,
    // Brazil
    LGPD: InitialViewState.QuickOptions,
    // Switzerland
    nFADP: InitialViewState.QuickOptions,
    // US: California
    CPRA: InitialViewState.Hidden,
    // US: Virginia
    CDPA: InitialViewState.Hidden,
    // US: Colorado
    CPA: InitialViewState.Hidden,
    // US: Nevada
    NEVADA_SB220: InitialViewState.Hidden,
    // Other
    Unknown: InitialViewState.Hidden,
    // US Do Not Sell/Share
    US_DNSS: InitialViewState.Hidden,
  };
