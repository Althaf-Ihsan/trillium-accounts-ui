

import { Apis } from '../APIs'
import httpCommon from '../http/http.common'

class PaymentService {
  fetchPayment(data) {
    return httpCommon.get(
      `${Apis.payment_patient}/payment/list/${data}`,
      {
        data:{}
      }
    )
  }
  getLedger(data) {
    return httpCommon.get(
      `${Apis.payment_patient}/payment/ledger/${data}`,
      {
        data:{}
      }
    )
  }

}
export default new PaymentService()
