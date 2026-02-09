import Image from "next/image";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import emailIcon from "@/assets/icons/mail.svg";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useGetCountriesQuery } from "@/lib/features/common/commonApi";
import CustomSelect from "@/components/general/CustomSelect";
import useSignup from "@/hooks/form-hooks/useSignup";

const SignupForm = () => {
  const {
    formik,
    isLoading,
    countries,
    showPassword,
    setshowPassword,
    showConfirmPassword,
    setshowConfirmPassword,
  } = useSignup();

  return (
    <div className="mt-7 lg:mt-0 lg:px-8  lg:py-6 px-6 bg-white lg:shadow-custom rounded-2xl">
      <div className="text-center">
        <h2 className="font-bold font-inter text-2xl text-center">
          Create an Account
        </h2>
        <p className="text-light">
          Please provide the information below to get started
        </p>
      </div>
      <div className="mt-8">
        <form className="" onSubmit={formik.handleSubmit}>
          <div className="">
            <label className="block font-medium text-sm" htmlFor="firstName">
              First Name
            </label>
            <div className="w-full border border-light-active rounded-md ">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.firstName}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="lastName">
              Last Name
            </label>
            <div className="w-full border border-light-active rounded-md ">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="email">
              Email
            </label>
            <div className="w-full flex border border-light-active rounded-md ">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Image src={emailIcon} alt="icon" className="pr-4 w-fit" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="phone">
              Phone Number
            </label>

            <PhoneInput
              placeholder="1234567890"
              country={"ng"}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              onBlur={() => formik.setFieldTouched("phone", true)}
              containerStyle={{
                width: "100%",
                height: "56px",
              }}
              inputStyle={{
                width: "100%",
                outline: "none",
                height: "56px",
                fontSize: "14px",
              }}
              buttonStyle={{
                background: "transparent",
              }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="mt-4">
            <CustomSelect
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={(name, value) => formik.setFieldValue(name, value)}
              options={countries.map((c: any) => ({
                label: c.name,
                value: c.name,
              }))}
              placeholder="Select your country"
              error={formik.errors.country}
              touched={formik.touched.country}
            />
          </div>
          <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor="password">
              Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {showPassword ? (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setshowPassword((prev) => !prev)}
                >
                  <Eye className="w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setshowPassword((prev) => !prev)}
                >
                  <EyeOff className="w-5" />
                </button>
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block font-medium text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="w-full border border-light-active rounded-md flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full outline-none border-none h-14 px-4 text-sm placeholder:text-light-aborder-light-active"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {showConfirmPassword ? (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setshowConfirmPassword((prev) => !prev)}
                >
                  <Eye className="w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="mr-4 cursor-pointer"
                  onClick={() => setshowConfirmPassword((prev) => !prev)}
                >
                  <EyeOff className="w-5" />
                </button>
              )}
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-600 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <div className="mt-8">
            <div className="">
              <button
                disabled={isLoading}
                type="submit"
                className={` w-full h-12 rounded-md text-center px-5 text-lg  font-semibold cursor-pointer ${
                  !formik.isValid || !formik.dirty || isLoading
                    ? "bg-[#C7D3CC] text-white"
                    : "bg-primary text-white"
                }`}
              >
                {isLoading ? "Loading..." : "Proceed"}
              </button>
            </div>
            <div className="flex items-center gap-2 w-full justify-center mt-2.5">
              <span className="font-semibold text-lg">
                Already have an account?
              </span>
              <Link
                href="/auth/login"
                className="text-primary text-lg font-semibold"
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
