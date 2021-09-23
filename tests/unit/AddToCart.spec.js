import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import AddToCart from "@/components/AddToCart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddToCart", () => {
  const store = new Vuex.Store(Store);

  let product;

  beforeEach(async () => {
    await store.commit("products", products);
    await store.commit("loggedIn", false);
    product = store.state.products[0];
  });

  it("should not show add-to-cart button when not loggedIn", () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
      propsData: {
        product,
      },
    });

    expect(wrapper.isVisible()).toBeFalsy();
  });

  it("should show add-to-cart button when loggedIn", async () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
      propsData: {
        product,
      },
    });

    await store.commit("loggedIn", true);

    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("should add product to store and update quantity", async () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
      propsData: {
        product,
      },
    });

    await store.commit("loggedIn", true);

    expect(product.id in store.state.carts).toBeFalsy();

    const addToCartBtn = wrapper.find("[data-testid='add-to-cart']");

    await addToCartBtn.trigger("click");

    expect(product.id in store.state.carts).toBeTruthy();

    expect(store.state.carts[product.id].quantity).toEqual(1);
  });
});
