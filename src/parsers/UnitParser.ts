import { CapabilityId, Unit, UnitContent, UnitPricing, Product } from '@octocloud/types';
import { UnitModel } from '../models/unit/UnitModel';
import { UnitContentModel } from '../models/unit/UnitContentModel';
import { UnitPricingModel } from '../models/unit/UnitPricingModel';
import { ParserOptions } from '../common/ParserOptions';
import { ProductModel } from '../models/product/ProductModel';

export class UnitParser {
  public parsePOJOToModel(unit: Unit): UnitModel {
    return new UnitModel({
      id: unit.id,
      internalName: unit.internalName,
      reference: unit.reference,
      type: unit.type,
      requiredContactFields: unit.requiredContactFields,
      visibleContactFields: unit.visibleContactFields,
      restrictions: unit.restrictions,
      unitContentModel: this.parseUnitContentPOJOToModel(unit),
      unitPricingModel: this.parseUnitPricingPOJOToModel(unit),
    });
  }

  public parseUnitContentPOJOToModel(unitContent: UnitContent): UnitContentModel | undefined {
    if (
      unitContent.title === undefined ||
      unitContent.titlePlural === undefined ||
      unitContent.subtitle === undefined
    ) {
      return undefined;
    }

    return new UnitContentModel({
      title: unitContent.title,
      titlePlural: unitContent.titlePlural,
      subtitle: unitContent.subtitle,
    });
  }

  public parseUnitPricingPOJOToModel(unitPricing: UnitPricing): UnitPricingModel | undefined {
    if (unitPricing.pricingFrom === undefined && unitPricing.pricing === undefined) {
      return undefined;
    }

    return new UnitPricingModel({
      pricing: unitPricing.pricing ?? unitPricing.pricingFrom,
    });
  }

  public parseModelToPOJO(unitModel: UnitModel, options: ParserOptions = { sourceModel: ProductModel }): Unit {
    return Object.assign(
      this.parseMainModelToPojo(unitModel),
      this.parseContentModelToPOJO(unitModel.unitContentModel),
      this.parsePricingModelToPOJO(unitModel.unitPricingModel, options),
    );
  }

  public parseModelToPOJOWithSpecificCapabilities(
    unitModel: UnitModel,
    capabilities: CapabilityId[],
    options: ParserOptions = { sourceModel: ProductModel },
  ): Unit {
    let unitContent;
    let unitPricing;

    if (capabilities?.includes(CapabilityId.Content)) {
      unitContent = this.parseContentModelToPOJO(unitModel.unitContentModel);
    }

    if (capabilities?.includes(CapabilityId.Pricing)) {
      unitPricing = this.parsePricingModelToPOJO(unitModel.unitPricingModel, options);
    }

    return Object.assign(this.parseMainModelToPojo(unitModel), unitContent, unitPricing);
  }

  private parseMainModelToPojo(unitModel: UnitModel): Unit {
    return {
      id: unitModel.id,
      internalName: unitModel.internalName,
      reference: unitModel.reference,
      type: unitModel.type,
      restrictions: unitModel.restrictions,
      requiredContactFields: unitModel.requiredContactFields,
      visibleContactFields: unitModel.visibleContactFields,
    };
  }

  public parseContentModelToPOJO(unitContentModel?: UnitContentModel): UnitContent {
    if (unitContentModel === undefined) {
      return {};
    }

    return {
      title: unitContentModel?.title,
      titlePlural: unitContentModel?.titlePlural,
      subtitle: unitContentModel?.subtitle,
    };
  }

  public parsePricingModelToPOJO(unitPricingModel?: UnitPricingModel, options?: ParserOptions): UnitPricing {
    if (unitPricingModel === undefined) {
      return {};
    }

    if (options?.sourceModel === ProductModel) {
      return {
        pricingFrom: unitPricingModel.pricing,
      };
    }

    return {
      pricing: unitPricingModel.pricing,
    };
  }
}
