import { BookingStatus, CapabilityId, RedemptionMethod } from "@octocloud/types";
import { UnitItemModel } from "../models/unitItem/UnitItemModel";
import { PartialUnitItem } from "../types/PartialUnitItem";
import { UnitModelBuilder } from "./UnitModelBuilder";
import { UnitItemPricingModel } from "../models/unitItem/UnitItemPricingModel";
import { UnitModel } from "../models/unit/UnitModel";
import { NullableFactory } from "../factories/NullableFactory";

interface UnitModelBuilderData {
  unitItemData: PartialUnitItem;
  capabilities?: CapabilityId[];
  sourceModel?: object;
}

const defaultCapabilities: CapabilityId[] = [CapabilityId.Pricing];

export class UnitItemModelBuilder {
  private readonly unitModelBuilder = new UnitModelBuilder();

  public build(builderData: UnitModelBuilderData): UnitItemModel {
    builderData.capabilities ??= defaultCapabilities;

    const { unitItemData } = builderData;
    const unitModel = this.unitModelBuilder.build({
      unitData: builderData.unitItemData.unit ?? {},
      capabilities: builderData.capabilities,
      sourceModel: builderData.sourceModel,
    });

    return new UnitItemModel({
      uuid: unitItemData.uuid ?? "10ea9ebd-a4f2-419e-808d-b0e111137a96",
      resellerReference: unitItemData.resellerReference ?? null,
      supplierReference: unitItemData.supplierReference ?? null,
      unitModel,
      status: unitItemData.status ?? BookingStatus.CANCELLED,
      utcRedeemedAt: unitItemData.utcRedeemedAt ?? null,
      contact: unitItemData.contact ?? {
        fullName: null,
        firstName: null,
        lastName: null,
        emailAddress: null,
        phoneNumber: null,
        locales: [],
        country: null,
        notes: null,
        postalCode: null,
      },
      ticket: NullableFactory.create(
        {
          redemptionMethod: RedemptionMethod.DIGITAL,
          utcRedeemedAt: null,
          deliveryOptions: [],
        },
        unitItemData.ticket
      ),
      unitItemPricingModel: this.buildPricingModel(builderData, unitModel),
    });
  }

  private buildPricingModel(builderData: UnitModelBuilderData, unitModel: UnitModel): UnitItemPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    const { unitItemData } = builderData;
    let pricing = unitItemData.pricing ?? undefined;

    if (unitItemData.pricing === undefined && unitModel.unitPricingModel?.pricing !== undefined) {
      pricing = unitModel.unitPricingModel.pricing[0];
    }

    return new UnitItemPricingModel({
      pricing,
    });
  }
}
