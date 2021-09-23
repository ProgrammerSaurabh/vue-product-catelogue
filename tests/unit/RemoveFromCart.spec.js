import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import RemoveFromCart from "@/components/RemoveFromCart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("RemoveFromCart", () => {
  const store = new Vuex.Store(Store);

  let product;

  beforeEach(async () => {
    await store.commit("products", products);
    await store.commit("loggedIn", false);
    await store.commit("updateCart", {});
    product = store.state.products[0];
  });

  it("should not show remove-from-cart button when not loggedIn", () => {
    const wrapper = mount(RemoveFromCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product,
    });

    expect(wrapper.isVisible()).toBe(false);
  });

  it("should show remove product from cart", async () => {
    const wrapper = mount(RemoveFromCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product,
    });

    await store.commit("loggedIn", true);
    await store.commit("addToCart", product);

    expect(
      Object.keys(store.state.carts).includes(product.id.toString())
    ).toBeTruthy();

    const removeFromCartBtn = wrapper.find("[data-testid='remove-btn']");

    await removeFromCartBtn.trigger("click");

    expect(
      Object.keys(store.state.carts).includes(product.id.toString())
    ).toBeFalsy();
  });
});
