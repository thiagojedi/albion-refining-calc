<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <h2>Recipe</h2>
        <new-material v-on:add-material="addComponent"></new-material>
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="comp in componentList"
            v-bind:key="comp.key"
          >
            <span>Material {{comp.key + 1}}</span>
            <span>{{comp.price}} silver x {{comp.quantity}} un.</span>
            <span
              class="btn badge badge-pill badge-danger"
              v-on:click="removeComponent(comp.key)"
            >remove</span>
          </li>
          <li class="list-group-item">Total Cost: {{componentCost}}</li>
        </ul>
      </div>
      <div class="col-sm">
        <h2>Product</h2>
        <div class="form">
          <div class="form-group row">
            <label for="prod-quant" class="col-2 col-form-label">Amount</label>
            <div class="col">
              <input
                type="number"
                name="prod-quant"
                id="prod-quant"
                class="form-control"
                v-model="amount"
              >
            </div>
          </div>
          <div class="form-group row">
            <label for="prod-price" class="col-2 col-form-label">Price</label>
            <div class="col">
              <input
                type="number"
                name="prod-price"
                id="prod-price"
                class="form-control"
                v-model="prodPrice"
              >
            </div>
          </div>
          <div class="form-group row">
            <label for="prod-value" class="col-2 col-form-label">Value</label>
            <div class="col">
              <input
                type="number"
                name="prod-value"
                id="prod-value"
                class="form-control"
                v-model="prodValue"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <h2>Refining</h2>
        <div class="form">
          <div class="form-group row">
            <label for="tax" class="col-2 col-form-label">Tax</label>
            <div class="col input-group">
              <input type="number" name="tax" id="tax" class="form-control" v-model="tax">
              <div class="input-group-append">
                <span class="input-group-text">%</span>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="return-rate" class="col-2 col-form-label">Return</label>
            <div class="col input-group">
              <input
                type="number"
                name="return-rate"
                id="return-rate"
                class="form-control"
                v-model="rate"
              >
              <div class="input-group-append">
                <span class="input-group-text">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <h2>Results</h2>
        <dl>
          <dt>Lucro</dt>
          <dl>{{profit}}</dl>
          <dt>Total Products</dt>
          <dl>{{total}}</dl>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
function rounds(rate) {
  return Math.log2(rate);
}

function total(quantity, rate) {
  if (rate === 0) return quantity;

  const r = rate / 100;

  return Math.round(quantity * ((Math.pow(r, rounds(rate)) - 1) / (r - 1)));
}

function costByTax(price, tax) {
  return (price * tax * 5) / 100;
}

import NewMaterial from "./new-material.vue";
export default {
  components: {
    NewMaterial
  },
  data: {
    amount: 0,
    components: [],
    prodPrice: 0,
    prodValue: 0,
    rate: 0,
    tax: 0
  },
  computed: {
    componentList() {
      return this.components.map((c, i) => Object.assign({ key: i }, c));
    },
    componentCost() {
      return (
        this.amount *
        this.components.reduce((s, c) => s + c.price * c.quantity, 0)
      );
    },
    profit() {
      const cost = costByTax(this.prodValue, this.tax);
      return Math.round(
        (this.prodPrice - cost) * this.total - this.componentCost
      );
    },
    total() {
      return total(this.amount, this.rate);
    }
  },
  methods: {
    addComponent(x) {
      this.components.push(x);
    },
    removeComponent(index) {
      this.components.splice(index, 1);
    }
  }
};
</script>