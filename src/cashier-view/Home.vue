<template>
   <section class="home-cashier-page">
      <div class="container pt-5">
         <h1 v-if="$route.name == 'PartnerPage'" class="mb-4">
            Our <strong class="text-primary">Partner</strong>
         </h1>
         <div
            class="option-partner-page w-100 mb-5 d-flex justify-content-between"
         >
            <input
               class="form-control w-25"
               @keyup="searchStore"
               v-model="search"
               type="text"
               placeholder="Search partner..."
            />
         </div>
         <div class="row">
            <div
               class="col-lg-12 text-center pt-5"
               v-if="store && store.length < 1"
            >
               <h1 class="mt-5">
                  Toko
                  <strong class="text-primary">{{ search }}</strong> tidak di
                  temukan.
               </h1>
            </div>
            <div
               class="col-md-4 col"
               v-for="item in store"
               :key="item.id"
               v-else
            >
               <div class="card shadow border-0 mb-4">
                  <div class="card-img-top">
                     <img :src="item.store_image" alt="" />
                  </div>
                  <div class="card-body">
                     <h5 class="card-title">{{ item.name }}</h5>
                     <div class="text-primary">
                        <p class="card-text m-0">
                           {{ item.location.city }},
                           {{ item.location.province }}
                        </p>
                     </div>
                     <router-link
                        class="btn btn-primary mt-3 rounded-pill px-3"
                        :to="'/store-profile/' + item.id"
                        >Visit Store</router-link
                     >
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import axios from "axios";

export default {
   name: "CashierPage",
   data() {
      return {
         store: [],
         search: "",
      };
   },
   methods: {
      SearchingPartners(data) {
         this.store = data;
      },
      searchStore() {
         axios
            .get(
               "https://franchise-backend.herokuapp.com/partners?name_like=" +
                  this.search
            )
            .then((response) => this.SearchingPartners(response.data))
            .catch((error) => console.log(error));
      },
   },
   created() {
      axios
         .get(
            "https://franchise-backend.herokuapp.com/partners?name_like=" +
               this.search
         )
         .then((response) => this.SearchingPartners(response.data))
         .catch((error) => console.log(error));
      this.SearchingPartners();
   },
};
</script>

<style></style>
