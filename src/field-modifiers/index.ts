import { optional } from './optional';
import { primary } from './primary';
import { unique } from './unique';
import { fieldDefault } from './default';

export const fieldModifierFns = {
  optional,
  primary,
  unique,
  default: fieldDefault,
};
