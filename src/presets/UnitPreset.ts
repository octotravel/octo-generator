import { AvailabilityType, CapabilityId, Currency, PricingPer, Product, Unit, UnitType } from '@octocloud/types';
import { ProductModelBuilder } from '../builders/ProductModelBuilder';
import { ProductModel } from '../models/product/ProductModel';
import { ProductParser } from '../parsers/ProductParser';
import { UnitParser } from '../parsers/UnitParser';
import { UnitModelBuilder } from '../builders/UnitModelBuilder';
import { UnitModel } from '../models/unit/UnitModel';
import { PricingPreset } from './PricingPreset';

export const ADULT_UNIT = {
  id: 'unit_adult',
  internalName: 'Adult',
  type: UnitType.ADULT,
  reference: 'adult',
  restrictions: {
    minAge: 18,
    maxAge: 99,
    idRequired: false,
    minQuantity: 1,
    maxQuantity: null,
    paxCount: 1,
    accompaniedBy: [],
  },
};

export const CHILD_UNIT = {
  id: 'unit_child',
  internalName: 'Child',
  type: UnitType.CHILD,
  reference: 'child',
  restrictions: {
    minAge: 4,
    maxAge: 12,
    idRequired: false,
    minQuantity: 1,
    maxQuantity: null,
    paxCount: 1,
    accompaniedBy: ['unit_adult'],
  },
};

export const INFANT_UNIT = {
  id: 'unit_infant',
  internalName: 'Infant',
  type: UnitType.INFANT,
  reference: 'infant',
  restrictions: {
    minAge: 0,
    maxAge: 3,
    idRequired: false,
    minQuantity: 1,
    maxQuantity: null,
    paxCount: 1,
    accompaniedBy: ['unit_adult'],
  },
};

export abstract class UnitPreset {
  private static readonly modelBuilder: UnitModelBuilder = new UnitModelBuilder();

  private static readonly modelParser: UnitParser = new UnitParser();

  public static readonly ADULT_UNIT_MODEL: UnitModel = this.modelBuilder.build({
    unitData: {
      ...ADULT_UNIT,
      pricingFrom: [PricingPreset.PRICING_10_EUR_POJO],
      pricing: [PricingPreset.PRICING_10_EUR_POJO],
    },
    pricingPer: PricingPer.UNIT,
    capabilities: [CapabilityId.Pricing],
    sourceModel: ProductModel,
  });

  public static readonly CHILD_UNIT_MODEL: UnitModel = this.modelBuilder.build({
    unitData: {
      ...CHILD_UNIT,
      pricingFrom: [PricingPreset.PRICING_8_EUR_POJO],
      pricing: [PricingPreset.PRICING_8_EUR_POJO],
    },
    pricingPer: PricingPer.UNIT,
    capabilities: [CapabilityId.Pricing],
    sourceModel: ProductModel,
  });

  public static readonly INFANT_UNIT_MODEL: UnitModel = this.modelBuilder.build({
    unitData: {
      ...INFANT_UNIT,
      pricingFrom: [PricingPreset.PRICING_0_EUR_POJO],
      pricing: [PricingPreset.PRICING_0_EUR_POJO],
    },
    pricingPer: PricingPer.UNIT,
    capabilities: [CapabilityId.Pricing],
    sourceModel: ProductModel,
  });

  public static readonly ADULT_UNIT_POJO: Unit = this.modelParser.parseModelToPOJO(this.ADULT_UNIT_MODEL, {
    sourceModel: ProductModel,
  });

  public static readonly CHILD_UNIT_POJO: Unit = this.modelParser.parseModelToPOJO(this.CHILD_UNIT_MODEL, {
    sourceModel: ProductModel,
  });

  public static readonly INFANT_UNIT_POJO: Unit = this.modelParser.parseModelToPOJO(this.INFANT_UNIT_MODEL, {
    sourceModel: ProductModel,
  });
}
