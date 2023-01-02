import { OptionParser } from "../OptionParser";
import { OptionTestDataProvider } from "./dataProviders/OptionTestDataProvider";

describe("OptionParser", () => {
  const optionParser = new OptionParser();
  const option = OptionTestDataProvider.option;
  const optionModel = OptionTestDataProvider.optionModel;

  describe("parseModelToPOJO", () => {
    it("should return option POJO", async () => {
      expect(optionParser.parseModelToPOJO(optionModel)).toStrictEqual(option);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return option model", async () => {
      expect(optionParser.parsePOJOToModel(option)).toStrictEqual(optionModel);
    });
  });
});
