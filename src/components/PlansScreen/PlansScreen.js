import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { setSubscription } from "../../features/subscriptionSlice";

const PlansScreen = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { user } = useSelector((store) => store.user);
  const { subscription } = useSelector((store) => store.subscription);
  const [proccessing, setProcessing] = useState(false);

  useEffect(() => {
    db.collection("customers")
      .doc(user.id)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          dispatch(
            setSubscription({
              role: subscription.data().role,
              current_period_end:
                subscription.data().current_period_end.seconds,
              current_period_start:
                subscription.data().current_period_start.seconds,
            })
          );
        });
      });
  }, [user, dispatch]);

  // console.log(subscription);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  //   console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.id)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      console.log("data", snap.data());
      console.log("error", error);
      if (error) {
        // show an error to your customer and
        // inspect your cloud function logs in the firebase console
        alert(`An error occurred : ${error.message}`);
      }
      if (sessionId) {
        console.log(sessionId);
        // we have a session let's redirect to checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_51NJDvQJVhFBV2Uh1iyVJ5q5KRnFk4agZLlqrJSukqqetguknFd01tBVi0Uq9buYaqHnMiNrq9lOB5yv0DJcUAdUu00CU72482O"
        );
        stripe.redirectToCheckout({ sessionId: sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p className="plansScreen__renewal">
          Renewal date :{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // TODO:  add some logic to check if the user subscription is active
        const isCurrentPackage = productData?.name
          .toLowerCase()
          .includes(subscription?.role);
        return (
          <div key={productId} className="plansScreen__plan">
            <div className="plansScreen__info">
              <h4> {productData.name} </h4>
              <h5 style={{ margin: "0" }}> {productData.description} </h5>
            </div>
            <button
              className={`btn ${isCurrentPackage && "plansScreen__current"}`}
              onClick={() => {
                setProcessing(true);
                !isCurrentPackage && loadCheckout(productData.prices.priceId);
              }}
            >
              {isCurrentPackage ? "Current Package" : `Subscribe`}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
