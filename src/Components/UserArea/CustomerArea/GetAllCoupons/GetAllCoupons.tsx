import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import store from '../../../../Redux/Store';
import { CouponModel } from '../../../../Model/CouponModel';
import notify from '../../../../Services/NotificationService';
import webApi from '../../../../Services/WebApi';
import { getCouponsAction, getCustomerCouponsAction } from '../../../../Redux/CustomerState';
import CustomLink from '../../../SharedArea/CustomLink/CustomLink';
import { Category } from '../../../../Model/Category';
import CouponItemCF from '../../../SharedArea/CouponItemCuF/CouponItemCuF ';
import EmptyView from '../../../SharedArea/EmptyView/EmptyView';

function GetAllCoupons() {
    const requiredType = "Customer";
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);
    const [myCoupons, setMyCoupons] = useState<CouponModel[]>(store.getState().customerReducer.customerCoupons);
    const [category, setCategory] = useState<String>("ALL");
    const [maxPrice, setMaxPrice] = useState<number>(0);


    useEffect(() => {
        if (!store.getState().userReducer.user.token) {
            notify.error("NO_TOKEN");
            navigate("/login");
        }
        if (!(store.getState().userReducer.user.clientType === requiredType)) {
            notify.error("UNAUTHORIZED_ACTION");
            navigate("/login");
        }
    }, [])

    useEffect(() => {
        if (coupons.length <= 0) {
            getAllCoupons();
        }
        if (myCoupons.length <= 0) {
            getAllCustomerCoupons();
        }
    }, [])

    const getAllCoupons = () => {
        webApi.customerGetAllCouponsApi().then((res) => {
            notify.success("COUPONS_FETCH_SUCCESS");
            store.dispatch(getCouponsAction(res.data));
            setCoupons(res.data);
        })
            .catch((error) => {
                notify.error(error);
            })
    }

    const getAllCustomerCoupons = async () => {
        await webApi.getAllCustomerCouponsApi().then((res) => {
            notify.success("MY_COUPONS_FETCH_SUCCESS");
            store.dispatch(getCustomerCouponsAction(res.data));
            setMyCoupons(res.data);
        })
            .catch((error) => {
                notify.error(error);
            })
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
        let filteredCoupons = store.getState().customerReducer.coupons;
        if (maxPrice !== 0) {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.price! <= maxPrice
                    });
        }
        if (e.currentTarget.value !== "ALL") {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.category!.valueOf() === e.currentTarget.value
                    });
        }
        setCoupons(filteredCoupons);
    }

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.currentTarget.value));
        let filteredCoupons = store.getState().customerReducer.coupons;
        if (category !== "ALL") {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.category!.valueOf() === category;
                    });
        }
        if (Number(e.currentTarget.value) !== 0) {
            filteredCoupons =
                filteredCoupons.filter(
                    (coupon) => {
                        return coupon.price! <= Number(e.currentTarget.value);
                    });
        }
        setCoupons(filteredCoupons);
    }


    return (
        <div className="coupons_view_container ">
            <h1 className='head'>All Coupons</h1>
            <CustomLink to="/company/coupon/add"><span />select category</CustomLink>
            <label htmlFor="category"></label>
            <select name='category' placeholder="category" onChange={(e) => handleCategoryChange(e)} defaultValue="ALL" id="category">
                <option key="ALL" value="ALL">All</option>
                {Object.keys(Category).map((key, index) => (
                    <option
                        aria-selected="true"
                        key={key}
                        value={key}
                    >{Object.values(Category)[index]}
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="price">Coupon Price</label>
            <input type="number" min={0} max={999_999} step={1} defaultValue={0} onChange={(e) => handleMaxPriceChange(e)} id="price" name='price' />
            <div className="coupon_list_container">
                {
                    coupons.length > 0 ?
                        (<div className="coupons_gallery">
                            {coupons.map((coupon, index) => (
                                <CouponItemCF key={index} coupon={coupon} />
                            ))}
                        </div>) :
                        (<div className="empty_view">
                            <EmptyView msg="no coupons available" />
                        </div>)
                }
            </div>
        </div>
    )
}

export default GetAllCoupons;
