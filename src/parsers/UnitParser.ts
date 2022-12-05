import * as R from "ramda";

import { Unit } from "@octocloud/types";
import { UnitModel } from "../models/UnitModel";
import { UnitContentModel } from "../models/UnitContentModel";
import { UnitPricingModel } from "../models/UnitPricingModel";

export class UnitParser {
  public parsePOJOToModel = (unit: Unit): UnitModel => {
    let unitContentModel;
    let unitPricingModel;

    if (
      R.not(R.isNil(unit.title)) ||
      R.not(R.isNil(unit.titlePlural)) ||
      R.not(R.isNil(unit.subtitle))
    ) {
      unitContentModel = new UnitContentModel({
        title: unit.title,
        titlePlural: unit.titlePlural,
        subtitle: unit.subtitle,
      });
    }

    if (R.not(R.isNil(unit.pricingFrom)) || R.not(R.isNil(unit.pricing))) {
      unitPricingModel = new UnitPricingModel({
        pricingFrom: unit.pricingFrom,
        pricing: unit.pricing,
      });
    }

    return new UnitModel({
      id: unit.id,
      internalName: unit.internalName,
      reference: unit.reference,
      type: unit.type,
      requiredContactFields: unit.requiredContactFields,
      restrictions: unit.restrictions,
      unitContentModel: unitContentModel,
      unitPricingModel: unitPricingModel,
    });
  };

  public parseModelToPOJO = (unitModel: UnitModel): Unit => {
    const unit: Unit = {
      id: unitModel.id,
      internalName: unitModel.internalName,
      reference: unitModel.reference,
      type: unitModel.type,
      restrictions: unitModel.restrictions,
      requiredContactFields: unitModel.requiredContactFields,
    };

    if (R.not(R.isNil(unitModel.unitContentModel))) {
      unit.title = unitModel.unitContentModel?.title;
      unit.titlePlural = unitModel.unitContentModel?.titlePlural;
      unit.subtitle = unitModel.unitContentModel?.subtitle;
    }

    if (R.not(R.isNil(unitModel.unitPricingModel))) {
      unit.pricingFrom = unitModel.unitPricingModel?.pricingFrom;
      unit.pricing = unitModel.unitPricingModel?.pricing;
    }

    return unit;
  };
}
