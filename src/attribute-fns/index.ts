import { Defaults } from '../interfaces';

const autoincrement = () => 'autoincrement()' as Defaults.autoincrement;
const cuid = () => 'cuid()' as Defaults.cuid;
const uuid = () => 'uuid()' as Defaults.uuid;
const now = () => 'now()' as Defaults.now;
const dbgenerated = (value: string = '') =>
  `dbgenerated(${value})` as Defaults.dbgenerated;

export { autoincrement, cuid, uuid, now, dbgenerated };
