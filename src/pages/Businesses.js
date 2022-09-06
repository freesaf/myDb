import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { categorySelected, fetchAllBusinesses } from "../actions/";

import BusinessCard from "../components/Businesses/BusinessCard";

export default function Businesses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [hoverIndex, sethoverIndex] = useState(-1);
  const state = useSelector((state) => {
    return state;
  });

  const businesses = state.businesses.businessesList;
  const selectedCat = state.businesses.selectedCategory;

  useEffect(() => {
    dispatch(fetchAllBusinesses());
    return () => {
      dispatch(categorySelected(null));
    };
  }, [dispatch]);

  const onSelectCategory = (category = null) => {
    dispatch(categorySelected(category));
  };

  const openBusiness = (id) => {
    // dispatch(businessSelected(biz));
    navigate(`/businessOwner/${id}`);
  };
  const renderCategories = () => {
    if (businesses === null) {
      return null;
    } else {
      const categories = new Set(
        businesses.map((business) => business.Category)
      );
      return (
        <div>
          <h4 className="border-solid border-collapse text-white bg-gray-800 mb-0 font-bold border-2  border-gray-900 font-semibold py-2 px-10 text-lg">
            Categories
          </h4>
          <h4
            onClick={() => {
              onSelectCategory();
            }}
            className={`${
              selectedCat === null ? "bg-gray-600" : "bg-gray-800"
            } border-solid border-collapse text-white mb-0 border-2 border-b-0 border-gray-900 text-center cursor-pointer font-semibold py-2 px-10 `}>
            All
          </h4>
          <div>
            {Array.from(categories).map((category, indx) => {
              return (
                <h4
                  key={category}
                  // onClick={() => {
                  //   sethoverIndex(indx);
                  // }}
                  // onMouseLeave={() => {
                  //   sethoverIndex(-1);
                  // }}
                  onClick={() => {
                    onSelectCategory(category);
                  }}
                  className={`${
                    selectedCat === category
                      ? "bg-gray-600"
                      : "bg-gray-800"
                  } border-solid border-collapse text-white mb-0 border-2 border-b-0 border-gray-900 text-center cursor-pointer font-semibold py-2 px-10 `}>
                  {category}
                  {/* <button>&#x25BC;</button> */}
                  {/* {hoverIndex === indx
                    ? businesses
                        .filter(
                          (bizness) => bizness.Category === category
                        )
                        .map((business) => {
                          return (
                            <div
                              key={business.id}
                              className="flex-col">
                              <Link
                                onClick={() => {
                                  dispatch(
                                    businessSelected(business)
                                  );
                                }}
                                className="block ml-16"
                                to={`/businessOwner/${business.id}`}>
                                {business.Bname}
                              </Link>
                            </div>
                          );
                        })
                    : null} */}
                </h4>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderBusinesses = () => {
    if (businesses === null) {
      return null;
    } else {
      const businessToRender = selectedCat
        ? businesses.filter((e) => e.Category === selectedCat)
        : businesses;
      return businessToRender.map((b) => {
        return (
          <BusinessCard
            openBusiness={() => {
              openBusiness(b.Uid, b);
            }}
            key={b.Uid}
            Picture={b.Picture}
            Bname={b.Bname}
            About={b.About}
            Web={b.Web}
            City={b.City}
          />
        );
      });
    }
  };
  return (
    <div>
      <div className="bg-green-400 rounded-lg text-center text-white font-bold px-10 py-6 mb-20">
        Search Businesses
      </div>
      <div className="flex justify-around">
        <div className="">{renderCategories()}</div>
        <div className="bg-gray-50 flex-wrap flex-1 flex">
          {renderBusinesses()}
        </div>
      </div>
    </div>
  );
}
