import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ProductDetail from "@/components/ProductDetail";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import AddToCart from "@/components/AddToCart";
import RemoveFromCart from "@/components/RemoveFromCart";
import EmptyData from "@/components/EmptyData";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProductDetail", () => {
  const store = new Vuex.Store(Store);

  const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  let products_;
  beforeEach(async () => {
    await store.commit("products", products);

    products_ = store.state.products;
  });

  it("should show empty data component on wrong id", () => {
    const $route = {
      path: "/products/:id",
      params: {
        id: products_.length + 1,
      },
    };

    const wrapper = mount(ProductDetail, {
      store,
      localVue,
      components: { AddToCart, RemoveFromCart, EmptyData },
      mocks: {
        $route,
      },
      propsData: {
        product: {},
      },
      stubs: ["router-link", "router-view"],
    });

    expect(wrapper.findComponent(EmptyData).exists()).toBeTruthy();
  });

  it("should show product name", () => {
    const product = products_[randomIndex(products_)];
    const $route = {
      path: "/products/:id",
      params: {
        id: product.id,
      },
    };

    const wrapper = mount(ProductDetail, {
      store,
      localVue,
      components: { AddToCart, RemoveFromCart, EmptyData },
      mocks: {
        $route,
      },
      propsData: {
        product,
      },
      stubs: ["router-link", "router-view"],
    });

    expect(wrapper.find("[data-testid='product-name']").text()).toEqual(
      product.name
    );
  });
});
