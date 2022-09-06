import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import {
  categorySelected,
  fetchPublishedExp,
  experienceSelected,
} from "../actions";
import ExperienceCard from "../components/experiences/ExperienceCard";

export default function Experiences() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });

  const exp = state.experiences.publishedExperiences;
  const selectedCat = state.experiences.selectedCategory;

  useEffect(() => {
    dispatch(fetchPublishedExp());
    return () => {
      dispatch(categorySelected(null));
    };
  }, [dispatch]);

  const openExp = (id, exp) => {
    // dispatch(experienceSelected(exp));
    navigate(`/businesses/show/${id}`);
  };

  const onSelectCategory = (category = null) => {
    dispatch(categorySelected(category));
  };

  const renderCategories = () => {
    if (exp === null) {
      return null;
    } else {
      const categories = new Set(
        exp.map((experience) => experience.Category)
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
                  onClick={() => {
                    onSelectCategory(category);
                  }}
                  className={`${
                    selectedCat === category
                      ? "bg-gray-600"
                      : "bg-gray-800"
                  } border-solid border-collapse text-white mb-0 border-2 border-b-0 border-gray-900 text-center cursor-pointer font-semibold py-2 px-10 `}>
                  {category}
                </h4>
              );
            })}
          </div>
        </div>
      );
    }
  };
  const renderExperiences = () => {
    if (exp === null) {
      return null;
    } else {
      const expTorender = selectedCat
        ? exp.filter((e) => e.Category === selectedCat)
        : exp;
      return expTorender.map((e) => {
        return (
          <ExperienceCard
            key={e.id}
            openExperience={() => {
              openExp(e.id, e);
            }}
            exp={e}
          />
        );
      });
    }
  };
  return (
    <div>
      <div className="bg-green-400 rounded-lg text-center text-white font-bold px-10 py-6 mb-20">
        Search experiences
      </div>
      <div className="flex justify-around">
        <div className="">{renderCategories()}</div>
        <div className="bg-gray-50 flex-wrap flex-1 flex">
          {renderExperiences()}
        </div>
      </div>
    </div>
  );
}
