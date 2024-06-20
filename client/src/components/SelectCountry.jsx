/* eslint-disable react/prop-types */
import { countryCodes } from "../assets/countryCodes.js";

const SelectCountry = ({ countryCode, setCountryCode }) => {
    const handleChange = (e) => {
        // console.log(e.target.value);
        setCountryCode(e.target.value);
    };

    return (
        <div>
            <label htmlFor="HeadlineAct" className="block text-xs font-medium text-gray-900 pl-1"> Select Country </label>

            <select
                name="HeadlineAct"
                id="HeadlineAct"
                value={countryCode}
                className="max-w-[150px] rounded-md border-gray-300 text-gray-700 sm:text-sm border-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) => handleChange(e)}
            >
                {/* <option selected>India</option> */}
                {Object.entries(countryCodes).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectCountry;
