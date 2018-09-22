import axios from "axios";

export default {
  //load products to database whenever user enter it on the form
  saveProduct: function(Products) {
    return axios.post("/api/items", Products);
  },
  //Find all products
  getProducts: function(){
    return axios.get("/api/items");
  },
  //Delete with given ID
  deleteProducts: function (id){
    return axios.delete("/api/items/" + id);
  }
};
