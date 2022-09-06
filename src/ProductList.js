import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./actions";
import { Link } from "@reach/router";

export default function ProductList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  console.log(availableProducts);
  return (
    <div>
      <div className="flex justify-end my-3">
        <Link className="p-2 text-white bg-blue-400" to="/ajouter">
          Ajouter un produit
        </Link>
      </div>
      <div className="flex justify-center">
        <table>
          <thead>
            <tr>
              <td className="border-2 p-2 font-medium border-gray-500">
                Image
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Code Barre
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Nom Arabe
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Nom Francais
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Marque
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Categorie
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Contenance
              </td>
              <td className="border-2 p-2 font-medium border-gray-500">
                Unite de mesure / emballage
              </td>
            </tr>
          </thead>
          <tbody>
            {availableProducts.map((product) => {
              return (
                <tr key={`${product.name}${product.img_src}`}>
                  <td className="border-2 p-2 border-gray-500">
                    <img
                      className="w-12"
                      src={product.img_src}
                      alt={product.name}
                    />
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    {product.barcode}
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    {product.name}
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    {product.productName}
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    {product.brand}
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    {JSON.parse(product.category)["name"]}
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    <div className="flex">
                      <span>{JSON.parse(product.unit)["name"]}</span>
                      <span>{product.productContenance}</span>
                    </div>
                  </td>
                  <td className="border-2 p-2 border-gray-500">
                    {JSON.parse(product.packageName)["name"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
