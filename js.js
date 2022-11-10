getProducts = async () => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZkNmUxM2Q0YmUzZDAwMTU4NDYxZDIiLCJpYXQiOjE2NjgxMTU5ODcsImV4cCI6MTY2OTMyNTU4N30.5WxddVzEkyxvokWGtpf6EjTKtC510Hocr2vX93-bqeY"
  );
  const options = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    options
  );
  const products = await response.json();
  return products;
};

renderProducts = (listOfProducts) => {
  let productslist = document.querySelector(".list-group");
  listOfProducts.map(
    ({ name, description, brand, imageUrl, price, _id }, index) => {
      const divNode = document.createElement("div");

      divNode.innerHTML = `<div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center shadow p-3 mb-5">
          <h4 class="ms-3 mr-3">${index + 1}</h4>
            <div>
            <img
            src=${imageUrl}
            class="img-fluid rounded" alt="Shopping item" style="width: 65px; height:70px">
            </div>
            <div class="ms-3 mx-2">
              <h5> ${name}</h5>
              <p class="small mb-0 d-inline-block text-truncate" style="max-width: 100px;">${description}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 100px;">
              <h5 class="fw-normal mb-0">${brand}</h5>
            </div>
            <div style="width: 50px;">
              <h5 class="mb-0">$${price}</h5>
            </div>
            <a href="../ProductDetails/index.html?productId=${_id}"><i class="fas fa-trash-alt">VIEW DETAILS</i></a>
          </div>
        </div>
      </div>`;
      productslist.appendChild(divNode);
    }
  );
};

window.onload = async () => {
  const products = await getProducts();
  renderProducts(products);
};
