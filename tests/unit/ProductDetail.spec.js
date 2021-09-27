import { createLocalVue, shallowMount, RouterLinkStub } from "@vue/test-utils";
import Vuex from "vuex";
import ProductDetail from "@/components/ProductDetail";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import EmptyData from "@/components/EmptyData";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProductDetail", () => {
  const store = new Vuex.Store(Store);

  const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const $route = {
    path: "/products/:id",
    params: {
      id: null,
    },
  };

  let products_;
  beforeEach(async () => {
    await store.commit("products", products);

    products_ = store.state.products;
  });

  it("should show empty data component on wrong id", () => {
    $route.params.id = products_.length + 1;

    const wrapper = shallowMount(ProductDetail, {
      store,
      localVue,
      mocks: {
        $route,
      },
      stubs: {
        EmptyData,
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.findComponent(EmptyData).exists()).toBeTruthy();
  });

  it("should show product name", () => {
    const product = products_[randomIndex(products_)];

    $route.params.id = product.id;

    const wrapper = shallowMount(ProductDetail, {
      store,
      localVue,
      mocks: {
        $route,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.find("[data-testid='product-name']").text()).toEqual(
      product.name
    );
  });
});
