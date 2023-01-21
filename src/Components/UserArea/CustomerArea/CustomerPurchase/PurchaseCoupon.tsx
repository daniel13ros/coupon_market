import React from 'react';
import { purchaseCouponAction } from '../../../../Redux/CustomerState';
import store from '../../../../Redux/Store';
import notify from '../../../../Services/NotificationService';
import webApi from '../../../../Services/WebApi';

function PurchaseCoupon(id: number) {
    
    webApi.purchaseCouponApi(id).then(() => {
        notify.success("COUPON_PURCHASE_SUCCESS");
        store.dispatch(purchaseCouponAction(id));
    })
    .catch((error) => {
        notify.error(error);
    })

}

export default PurchaseCoupon;