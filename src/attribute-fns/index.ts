import { Defaults } from '../interfaces';

const autoincrement = () => 'autoincrement()' as Defaults.autoincrement;
const cuid = () => 'cuid()' as Defaults.cuid;
const dbgenerated = (value: string = '') =>
  `dbgenerated(${value})` as Defaults.dbgenerated;
const now = () => 'now()' as Defaults.now;
const uuid = () => 'uuid()' as Defaults.uuid;

export { autoincrement, cuid, dbgenerated, now, uuid };
