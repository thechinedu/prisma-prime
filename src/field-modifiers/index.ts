import { optional } from './optional';
import { primary } from './primary';
import { unique } from './unique';
import { fieldDefault } from './default';

export const fieldModifiers = {
  optional,
  primary,
  unique,
  default: fieldDefault,
};
