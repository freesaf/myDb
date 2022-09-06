import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ProgressBar from "./components/ProgressBar";
import {
  uploadFile,
  setImgLinktoNull,
  addNewProduct,
  fetchAllProducts,
} from "./actions";
import { navigate } from "@reach/router";

export default function AddProduct() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onBlur",
  });
  const [isHidden, setisHidden] = useState(true);
  const [showX, setshowX] = useState(false);
  const [pdtErrors, setpdtErrors] = useState({
    msg: "",
    product: "",
  });
  const [products, setproducts] = useState({
    categories: [
      {
        __typename: "ProductCategoryType",
        id: "1",
        name: "تغدية",
        frName: "Alimentation",
      },
      {
        __typename: "ProductCategoryType",
        id: "2",
        name: "تغدية الحيونات",
        frName: "",
      },
      {
        __typename: "ProductCategoryType",
        id: "3",
        name: "تجميل/نظافة شخصية",
        frName: "",
      },
      {
        __typename: "ProductCategoryType",
        id: "4",
        name: "لوازم المطبخ",
        frName: "Ustensil de Cuisine",
      },
      {
        __typename: "ProductCategoryType",
        id: "5",
        name: "خدمات",
        frName: "Service",
      },
      {
        __typename: "ProductCategoryType",
        id: "6",
        name: "مواد التنظيف",
        frName: "Nettoyage",
      },
      {
        __typename: "ProductCategoryType",
        id: "7",
        name: "صيانة و إصلاح",
        frName: "Bricolage / réparation",
      },

      {
        __typename: "ProductCategoryType",
        id: "8",
        name: "سقاطة",
        frName: "BonBon et biscuits",
      },
      {
        __typename: "ProductCategoryType",
        id: "9",
        name: "لوازم الحلويات",
        frName: "Pâtisserie",
      },
    ],
    packageName: [
      {
        __typename: "BigPackageNameType",
        id: 1,
        name: "كارط",
        frName: "Carte",
      },
      {
        __typename: "BigPackageNameType",
        id: 2,
        name: "خنشة",
        frName: "Sac",
      },
      {
        __typename: "BigPackageNameType",
        id: 3,
        name: "قرعة",
        frName: "Bouteille",
      },
      {
        __typename: "BigPackageNameType",
        id: 4,
        name: "باكية",
        frName: "Packet",
      },
      //   {
      //     __typename: "BigPackageNameType",
      //     id: 5,
      //     name: "باكية صغيرة",
      //     frName: "Petit Packet",
      //   },
      {
        __typename: "BigPackageNameType",
        id: 6,
        name: "ساشي",
        frName: "Sachet",
      },
      {
        __typename: "BigPackageNameType",
        id: 7,
        name: "كرطونة/صندوق",
        frName: "Caisse",
      },
      {
        __typename: "BigPackageNameType",
        id: 8,
        name: "حك",
        frName: "Boite",
      },
      {
        __typename: "BigPackageNameType",
        id: 9,
        name: "علبة",
        frName: "Boite",
      },
      {
        __typename: "BigPackageNameType",
        id: 10,
        name: "بواطة",
        frName: "Boite",
      },
      {
        __typename: "BigPackageNameType",
        id: 11,
        name: "وحدة",
        frName: "Unité",
      },
      {
        __typename: "BigPackageNameType",
        id: 12,
        name: "بيدو",
        frName: "Bidon",
      },
      {
        __typename: "BigPackageNameType",
        id: 13,
        name: "كيلو",
        frName: "Kilogramme",
      },
      {
        __typename: "BigPackageNameType",
        id: 14,
        name: "متر",
        frName: "Mètre",
      },
      {
        __typename: "BigPackageNameType",
        id: 15,
        name: "غرام",
        frName: "Gramme",
      },
      {
        __typename: "BigPackageNameType",
        id: 16,
        name: "سنتيمتر",
        frName: "Centimètre",
      },
      {
        __typename: "BigPackageNameType",
        id: 17,
        name: "ليتر",
        frName: "Litre",
      },
      {
        __typename: "BigPackageNameType",
        id: 18,
        name: "سنتيليتر",
        frName: "Centilitre",
      },
      {
        __typename: "BigPackageNameType",
        id: 19,
        name: "درهم",
        frName: "Dirhams",
      },
    ],
    units: [
      {
        __typename: "BigPackageNameType",
        id: 0,
        name: "وحدة",
        frName: "Unité",
        abrev: "x",
      },
      {
        __typename: "BigPackageNameType",
        id: 1,
        name: "كيلو",
        frName: "Kilogramme",
        abrev: "Kg",
      },
      {
        __typename: "BigPackageNameType",
        id: 2,
        name: "متر",
        frName: "Mètre",
        abrev: "m",
      },
      {
        __typename: "BigPackageNameType",
        id: 3,
        name: "غرام",
        frName: "Gramme",
        abrev: "g",
      },
      {
        __typename: "BigPackageNameType",
        id: 4,
        name: "سنتيمتر",
        frName: "Centimètre",
        abrev: "cm",
      },
      {
        __typename: "BigPackageNameType",
        id: 5,
        name: "ليتر",
        frName: "Litre",
        abrev: "L",
      },
      {
        __typename: "BigPackageNameType",
        id: 6,
        name: "ميليلتر",
        frName: "Mililitre",
        abrev: "ml",
      },
    ],
  });
  const state = useSelector((state) => {
    return state;
  });

  const progressValue = state.uploads.uploadProgress;
  let imgLink = state.uploads.downloadURL;
  const allProducts = state.products.availableProducts;
  const handleChange = (files) => {
    setisHidden(false);
    dispatch(uploadFile(files, "products"));
  };

  const onSubmit = (val) => {
    // if files[0] exist and imgLink undefined alert Please reupload the image
    if (isValid) {
      val.img_src = imgLink;
      delete val.imgFile;
      console.log(val);
      dispatch(addNewProduct(val));
      navigate("/");
    } else {
      console.log("remplisser le formulaire...");
    }
  };
  const filterByCode = (code) => {
    let exist = allProducts.find(
      (product) => String(product.barcode) === String(code)
    );
    if (exist) {
      setpdtErrors({
        ...state,
        msg: "Ce produit existe déjà !!",
        product: exist.img_src,
      });
    } else {
      setpdtErrors({
        ...state,
        msg: "",
        product: "",
      });
    }
  };
  console.log(watch("brand"));

  return (
    <div className="flex justify-around p-10">
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="hasBarcodeId">
          Est ce que ce produit a un Code barre ?
        </label>
        <input
          id="hasBarcodeId"
          className="w-10"
          type="checkbox"
          name="hasBarcode"
          ref={register}
        />
        <p className="text-gray-500 text-xs italic">
          Ne pas cochez si le produit n'a pas de code barre
        </p>
        <br />
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="barcodeId">
          Code barre
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="barcodeId"
          type="number"
          onChange={(e) => {
            filterByCode(e.target.value);
          }}
          name="barcode"
          ref={register({ required: watch("hasBarcode") })}
        />
        {pdtErrors.msg && (
          <div className="flex justify-between items-center">
            <p className=" text-sm italic text-red-600"> {pdtErrors.msg} </p>
            <img className="w-10" src={pdtErrors.product} alt="" />
          </div>
        )}

        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="nameId">
          Nom du produit en Arabe
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="nameId"
          type="text"
          placeholder="إسم المنتج بالحروف العربية"
          name="name"
          ref={register({ required: true })}
        />
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="productNameId">
          Nom du produit en Francais
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="productNameId"
          type="text"
          name="frName"
          ref={register({ required: true })}
        />
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="keywordId">
          Mot clé pour rechervher ce produit
        </label>

        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400 focus:border-gray-500"
          id="keywordId"
          placeholder=" 6 mots clés: 3 arabe et 3 francais"
          name="keywords"
          ref={register({ required: true })}
        />
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="BrandNameId">
          Nom de la marque
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="BrandNameId"
          type="text"
          name="brand"
          ref={register({ required: true })}
        />
        {String(watch("brand")).length > 0 && (
          <ul>
            {allProducts
              .filter((prod) => prod.brand.includes(watch("brand")))
              .map((product) => {
                return (
                  <li
                    key={product.barcode}
                    onClick={() => {
                      setValue("brand", product.brand);
                    }}>
                    {product.brand}
                  </li>
                );
              })}
          </ul>
        )}
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="contenanceId">
          Contenance du produit
        </label>

        <div className="flex justify-around appearance-none w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400">
          <select
            //   className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            name="unit"
            ref={register({ required: true })}>
            {products.units.map((productPackage) => {
              return (
                <option
                  key={productPackage.id}
                  value={JSON.stringify(productPackage)}>
                  {" "}
                  {productPackage.name}{" "}
                </option>
              );
            })}
          </select>
          <input
            dir="rtl"
            defaultValue={1}
            id="contenanceId"
            type="number"
            name="productContenance"
            ref={register({ required: true })}
          />
        </div>
        <br />
        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="image">
          Image du produit
        </label>
        <input
          onChange={(e) => {
            handleChange(e.target.files);
          }}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="image"
          type="file"
          placeholder="Image du produit"
          name="imgFile"
          ref={register}
        />
        <ProgressBar
          percentage={progressValue}
          show={isHidden ? "hidden" : "block"}
        />
        <div
          className={`${imgLink ? "block" : "hidden"} cursor-pointer w-10`}
          //   onClick={() => {
          //     //TO DO delete img from firebase storage
          //     console.log("image deleted");
          //     dispatch(setImgLinktoNull());
          //   }}
          //   onMouseEnter={() => {
          //     setshowX(true);
          //   }}
          //   onMouseLeave={() => {
          //     setshowX(false);
          //   }}
        >
          <img src={imgLink} alt="productImage" />
        </div>
        <br />

        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="categoryId">
          Categorie du produit
        </label>

        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="categoryId"
          name="category"
          ref={register({ required: true })}>
          {products.categories.map((category) => {
            return (
              <option key={category.id} value={JSON.stringify(category)}>
                {" "}
                {category.name}{" "}
              </option>
            );
          })}
        </select>
        <br />

        <label
          className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
            isValid ? "" : "border-red-600"
          }`}
          htmlFor="packageId">
          Unité de mesure ou de vente du produit
        </label>

        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="packageId"
          name="packageName"
          ref={register({ required: true })}>
          {products.packageName.map((productPackage) => {
            return (
              <option
                key={productPackage.id}
                value={JSON.stringify(productPackage)}>
                {" "}
                {productPackage.name}{" "}
              </option>
            );
          })}
        </select>
        <br />

        <input
          className="bg-green-300 border border-solid border-green-500 p-2 rounded-lg hover:bg-green-400"
          type="submit"
          value="Enregistrer"
        />
      </form>
    </div>
  );
}
