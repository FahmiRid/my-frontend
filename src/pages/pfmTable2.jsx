import React, {  useState , useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import CTAButton from "../../shared-modules/buttons/CTAButton";
import CepHeader from "../../shared-modules/header-fragment/CepHeader";
import CepScroller from "../../shared-modules/header-fragment/CepScroller";
import MomentUtils from "../../shared-modules/lib-moment/MomentUtils";
import SVGAddIcon from "../../shared-modules/ui-svg/SVGAddIcon";
import SVGDeleteIcon from "../../shared-modules/ui-svg/SVGDeleteIcon";
// import { apiErrorHandler } from "../../shared-modules/util-api/ApiMiddleware";
import useServerPagination from "../../shared-modules/util-pagination/useServerPagination";
import { paginationControlTemplate } from "../../shared-modules/util-pagination/pagination-components";
import HotToastUtils from "../../shared-modules/lib-toast/HotToastUtils";
import SVGCloseIcon from "../../shared-modules/ui-svg/SVGCloseIcon";
import PfmCreate from "./PfmCreate";
import PfmEdit from "./PfmEdit";
import { fetchData } from "./apiList";
import axios from "axios";

const dropStyleMain = "relative inline-block w-full text-gray-700";
const drStyle =
  "w-full px-2 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150";
const drStyleBox =
  "absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none";
const svgClass =
  'w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor';
const Dpath =
  "M5.293 6.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z";

export const DynamicFilterOption = ({
  children,
  dataType,
  dataName,
  dataValue,
  setDataValue,
  dataValueHandler,
  optionTitle,
  optionState,
  setOptionState,
  errMsg,
  ...rest
}) => {
  return (
    <div className="w-full">
      {optionState === true ? (
        <>
          <div className="rounded-xl border hover:shadow-md shadow p-2 bg-white">
            <div className="flex justify-between items-start mb-2">
              <label className="text-sm">{optionTitle}</label>
              <button
                onClick={() => {
                  setOptionState(false);
                  setDataValue((prev) => {
                    const current = { ...prev };
                    delete current[dataName];
                    return current;
                  });
                }}
              >
                <SVGCloseIcon />
              </button>
            </div>
            {{
              text: (
                <>
                  <input
                    type="text"
                    name={dataName}
                    value={dataValue || ""}
                    onChange={(e) => dataValueHandler(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...rest}
                  />
                  {children}
                </>
              ),
              date: (
                <>
                  <input
                    type="date"
                    name={dataName}
                    value={dataValue || ""}
                    onChange={(e) => dataValueHandler(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...rest}
                  />
                  {children}
                </>
              ),
              select: (
                <>
                  <select
                    name={dataName}
                    value={dataValue || ""}
                    onChange={(e) => dataValueHandler(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...rest}
                  >
                    <option value="">Select...</option>
                    {children}
                  </select>
                </>
              ),
            }[dataType] || (
              <>
                <input
                  type="text"
                  name={dataName}
                  value={dataValue || ""}
                  onChange={(e) => dataValueHandler(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...rest}
                />
                {children}
              </>
            )}
          </div>
          {errMsg ? <p className="text-xs text-red-900">{errMsg}</p> : <></>}
        </>
      ) : (
        <div className="flex gap-2 justify-between items-center h-min p-2 rounded-xl border shadow hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
          <label className="text-sm">{optionTitle}</label>
          <button
            onClick={() => setOptionState(optionState === false ? true : false)}
            {...rest}
          >
            <SVGAddIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const PfmTable = () => {

  const [data, setData] = useState([]);
  const searchItem = "Default search";
  console.log("searchItem", searchItem);

   useEffect(() => {
    axios
      .get("http://172.30.2.107:8080/configuration/listConfig")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

//   useEffect(() => {
//     const getData = async () => {
//       const [result] = await fetchData(); // use array destructuring
//       setData(result);
//     };
//     getData();
//   }, []);

  // eslint-disable-next-line
  const [triggerListing, setTriggerListing] = useState(1);
  const {
    pageCount,
    // paginationParams,
    // setTotalRecords,
    renderPaginationControls,
    resetToFirstPage,
  } = useServerPagination({
    pageSize: 50,
    paginationControlTemplate: paginationControlTemplate,
    triggerAPICall: () => setTriggerListing((p) => p + 1),
  });

  console.log('rules data ==>',data)
  const FragmentSurveyTable = () => (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {data && data.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 py-3">
                Match
              </th>
              <th scope="col" className="pl-6 py-3">
                Field
              </th>
              <th scope="col" className="px-3 py-3">
                Category
              </th>
              <th scope="col" className="px-3 py-3">
                Level
              </th>
              <th scope="col" className="px-3 py-3">
                Movement
              </th>
              <th scope="col" className="px-3 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.btsId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-3 py-3">{item.match}</td>
                <td className="px-3 py-3">{item.field}</td>
                <td className="px-3 py-3">{item.btsCategory.name}</td>
                <td className="px-3 py-3">{item.level}</td>
                <td className="px-3 py-3">{item.movement}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="px-6 py-4">No contacts found</p>
      )}
    </div>
  );

  return (
    <>
      <CepHeader />
      <CepScroller>
        <div className="w-full">
          <div className="flex mb-6">
            <label className="text-2xl font-bold">
              PFM Configuration - Search PFM Configuration
            </label>
          </div>
          <div className="w-5/6 mb-2">
          </div>
          <div>
            <FragmentSurveyTable />
        </div>
          {data && data.lenght > 0}
          <>
            {data &&
              data.length > 0 &&
              pageCount > 0 &&
              renderPaginationControls()}
          </>
        </div>
      </CepScroller>
    </>
  );
};
export default PfmTable;
