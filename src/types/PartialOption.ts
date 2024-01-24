import { Option } from '@octocloud/types';
import { PartialUnit } from './PartialUnit';

export type PartialOption = Partial<
  Omit<Option, 'units'> & {
    units: PartialUnit[];
  }
>;
