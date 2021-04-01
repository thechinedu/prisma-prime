import { fieldDefault } from './default';
import { list } from './list';
import { optional } from './optional';
import { primary } from './primary';
import { relation } from './relation';
import { unique } from './unique';
import { updatedAt } from './updated-at';

export const fieldModifierFns = {
  default: fieldDefault,
  list,
  optional,
  primary,
  relation,
  unique,
  updatedAt,
};
