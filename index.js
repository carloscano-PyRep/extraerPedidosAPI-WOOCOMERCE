const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require("fs");

const api = new WooCommerceRestApi({
  url: "",
  consumerKey: "",
  consumerSecret: "",
  version: ""
});

// List products
api.get("orders", {
    status: ["processing"]
  })
  
    .then((response) => {
      // Successful request
      /* console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      console.log("Total of pages:", response.headers['x-wp-totalpages']);
      console.log("Total of items:", response.headers['x-wp-total']);
      console.log("Numero de orden:", response.data[6].id) */
      let dataCustomer = new Object();
      for(i = 0; i < response.data.length; i++) {
        /* dataCustomer[i] = [response.data[i].id,response.data[i].billing["email"],response.data[i].line_items[0]]; */
        //response.data[i].id,response.data[i].billing["email"],response.data[i].line_items[0].name
        //dataCustomer[i] = {order:response.data[i].id,email:response.data[i].billing["email"], producto:response.data[i].line_items[0].name, cantidad:response.data[i].line_items[0].quantity};
        dataCustomer[i] =":"+response.data[i].id + ":" + response.data[i].billing["email"]+ ":" +response.data[i].line_items[0].name + ":" +response.data[i].line_items[0].quantity +":PENDIENTE";
        //var dataCustomer1 = response.data[i].number;
        //console.log("Numero de cada orden", dataCustomer1)
        console.log(dataCustomer[i]);
        let document = JSON.stringify(dataCustomer,null,'\t');
        fs.writeFileSync('archivoJSON.csv',document);
      }
    })
      // Invalid request, for 4xx and 5xx statuses
    .catch((error) => {
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
    })
    .finally(() => {
      // Always executed.
    });
