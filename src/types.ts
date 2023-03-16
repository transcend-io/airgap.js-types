// external
import * as t from 'io-ts';

// main
import { FixedLengthArray } from '@transcend-io/type-utils';

// local
import type { TrackingPurpose } from './core';

/** Regime purpose scopes configuration */
export const RegimePurposeScopesConfig = t.array(
  FixedLengthArray(2, 2, t.array(t.string)),
);
/** Type override */
export type RegimePurposeScopesConfig = [
  /** Regimes */
  regimes: string[],
  /** In-scope purposes */
  purposes: TrackingPurpose[],
][];
