import { optional } from './optional';
import { primary } from './primary';
import { unique } from './unique';
import { fieldDefault } from './default';
import { list } from './list';
import { updatedAt } from './updatedAt';

export const fieldModifierFns = {
  optional,
  primary,
  unique,
  default: fieldDefault,
  list,
  updatedAt,
};
