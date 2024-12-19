import React, { useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  fetchCategories,
  selectCategories,
} from "../redux/slices/categorySlice";

const { Option } = Select;

interface categorySelectProps {
  allCategories?: boolean;
  externalLoading?: boolean;
  onValueChange: (value: number) => void;
}

const CategorySelect: React.FC<categorySelectProps> = ({
  onValueChange,
  allCategories,
  externalLoading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status } = useSelector(selectCategories);

  const setCategoryValue = (_, props) => {
    onValueChange(props.value);
  };

  useEffect(() => {
    dispatch(fetchCategories(20));
  }, [dispatch]);

  return (
    <Select
      className="shadow-sm"
      defaultValue={allCategories ? "All" : null}
      loading={status === "loading"}
      onChange={setCategoryValue}
      disabled={status === "loading" || externalLoading}
    >
      { allCategories && <Option value="All">All Categories</Option>}
      {categories.map((category) => (
        <Option key={category.id} value={category.id}>
          {category.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
