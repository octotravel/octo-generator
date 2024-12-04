/* eslint-disable @typescript-eslint/dot-notation */
import { BookingPreset } from '../BookingPreset';

describe.skip('BookingPreset', () => {
  describe('ON_HOLD_BOOKING_MODEL', () => {
    it('should build ON_HOLD_BOOKING_MODEL', async () => {
      // console.log(JSON.stringify(BookingPreset.ON_HOLD_BOOKING_MODEL_POJO))
      // expect(BookingPreset.ON_HOLD_BOOKING_MODEL_POJO.productId).toEqual();
      expect(BookingPreset.ON_HOLD_BOOKING_MODEL_POJO.unitItems).toEqual([]);
    });
  });
});
