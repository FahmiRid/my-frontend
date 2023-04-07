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
  // const [jsonData, setJsonData] = useState(rulesData);
  const [data, setData] = useState([]);
  // const navigate = useNavigate();
  // const [responseID, setResponseID] = useState(false);
  const responseID = false;
  // const [filteredData, setFilterData] = useState({});
  // const filteredData = {};
  const [filteredData, setFilteredData] = useState(data);
  // const [searchQuery, setSearchQuery] = useState("");
  const searchQuery = "";
  // const [searchTerm, setSearchTerm] = useState("");
  const searchTerm = "";
  const [selectedMatch, setSelectedMatch] = useState("all");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMovement, setSelectedMovement] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  // const [errors, setErrors] = useState({});
  // const [searchItem, setSearchItem] = useState("Default search");
  const searchItem = "Default search";
  const [showModal, setShowModal] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  console.log("searchItem", searchItem);

  useEffect(() => {
    const getData = async () => {
      const [result] = await fetchData(); // use array destructuring
      setData(result);
    };
    getData();
  }, []);

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsEditFormOpen(true);
  };

  const handleUpdate = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.btsid === editItem.btsid ? { ...item, ...updatedItem } : item
      )
    );
    setEditItem(null);
    setIsEditFormOpen(false);
  };

  // function handleShow() {
  //   setShowModal(true);
  // }

  function handleClose() {
    setShowModal(false);
  }

  const addRule = (newRule) => {
    setData([...data, newRule]);
    setShowModal(false);
  };
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

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      return (
        (item.match && typeof item.match === 'string' &&
          item.match.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.field &&
          item.field.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.type &&
          item.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.btsCategory &&
          item.btsCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.level &&
          item.level
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (item.movement &&
          item.movement.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(filtered);
    // Filter the data based on the selected field and search query
    const filteredData = data.filter((item) => {
      if (selectedMatch === "all" || item.match === selectedMatch) {
        if (selectedField === "all" || item.field === selectedField) {
          if (selectedType === "all" || item.type === selectedType) {
            if (
              selectedCategory === "all" ||
              item.btsCategory === selectedCategory
            ) {
              if (
                selectedMovement === "all" ||
                item.movement === selectedMovement
              ) {
                if (
                  selectedLevel === "all" ||
                  item.level.toString() === selectedLevel
                ) {
                  const values = Object.values(item);
                  for (let i = 0; i < values.length; i++) {
                    if (
                      String(values[i])
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    ) {
                      return true;
                    }
                  }
                }
              }
            }
          }
        }
      }
      return false;
    });

    // Update the data with the filtered results
    setData([{ ...data, data: filteredData }]);
  };

  const handleMatchChange = (e) => setSelectedMatch(e.target.value);
  const handleFilterChange = (e) => setSelectedField(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleMovementChange = (e) => setSelectedMovement(e.target.value);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);

  const isValidationOk = (filteredData) => {
    if (filteredData.start_date && filteredData.end_date) {
      if (MomentUtils.isBefore(filteredData.start_date, filteredData.end_date)) {
        // setErrors({});
      } else {
        // setErrors((prev) => ({
        //   ...prev,
        //   end_date: "End Date should be greater than Start Date",
        //   start_date: "Start Date should be less than End Date",
        // }));
        return false;
      }
    } else {
      // setErrors({});
    }
    // setErrors({});
    return true;
  };

  const handleClearFilter = () => {
    HotToastUtils.toastGoodNews("Clearing");
    setSelectedMatch(false);
    setSelectedField(false);
    setSelectedType(false);
    setSelectedCategory(false);
    setSelectedMovement(false);
    setSelectedLevel(false);
    setFilteredData(false);
  };

  const FragmentSurveyFilter = () => (
    <>
      <div className="mb-0">
        <label className="text-sm pl-2 font-bold">Filter Search</label>
      </div>

      <div className="grid gap-4 grid-cols-8 mb-4">
        <div className={dropStyleMain}>
          <select
            className={drStyle}
            value={selectedMatch}
            onChange={handleMatchChange}
          >
            <option value="" className="hidden">
              Match...
            </option>
            {data && data.length > 0 && data.map((item, index) => (
              <option key={index} value={item.match}>
                {item.match}
              </option>
            ))}
          </select>

          <div className={drStyleBox}>
            <svg className={svgClass}>
              <path fillRule="evenodd" d={Dpath} clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className={dropStyleMain}>
          <select
            className={drStyle}
            value={selectedField}
            onChange={handleFilterChange}
          >
            <option value="" className="hidden">
              Field...
            </option>
            {data && data.length > 0 && data.map((item, index) => (
              <option key={index} value={item.field}>
                {item.field}
              </option>
            ))}
          </select>

          <div className={drStyleBox}>
            <svg className={svgClass}>
              <path fillRule="evenodd" d={Dpath} clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className={dropStyleMain}>
          <select
            className={drStyle}
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="" className="hidden">
              Type...
            </option>
            {data && data.length > 0 && data.map((item, index) => (
              <option key={index} value={item.type}>
                {item.type}
              </option>
            ))}
          </select>
          <div className={drStyleBox}>
            <svg className={svgClass}>
              <path fillRule="evenodd" d={Dpath} clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className={dropStyleMain}>
          <select
            className={drStyle}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" className="hidden">
              Category...
            </option>
            {data && data.length > 0 && data.map((item, index) => (
              <option key={index} value={item.btsCategory}>
                {item.btsCategory}
              </option>
            ))}
          </select>
          <div className={drStyleBox}>
            <svg className={svgClass}>
              <path fillRule="evenodd" d={Dpath} clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className={dropStyleMain}>
          <select
            className={drStyle}
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            <option value="" className="hidden">
              Level...
            </option>
            {data && data.length > 0 && data.map((item, index) => (
              <option key={index} value={item.level}>
                {item.level}
              </option>
            ))}
          </select>
          <div className={drStyleBox}>
            <svg className={svgClass}>
              <path fillRule="evenodd" d={Dpath} clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className={dropStyleMain}>
          <select
            className={drStyle}
            value={selectedMovement}
            onChange={handleMovementChange}
          >
            <option value="" className="hidden">
              Movement...
            </option>
            {data && data.length > 0 && data.map((item, index) => (
              <option key={index} value={item.movement}>
                {item.movement}
              </option>
            ))}
          </select>
          <div className={drStyleBox}>
            <svg className={svgClass}>
              <path fillRule="evenodd" d={Dpath} clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="">
          <CTAButton
            onClick={() => {
              if (isValidationOk(filteredData)) {
                handleSearch();
                resetToFirstPage();
                HotToastUtils.toastGoodNews(
                  searchItem === true ? "Searching" : "Searching all records"
                );
                setTriggerListing((p) => p + 1);
              } else {
                // validation messages already being printed in the previous function
              }
            }}
            extraClasses={"w-full"}
          >
            Search
          </CTAButton>
        </div>
        <div className="">
          <CTAButton
            onClick={() => {
              handleClearFilter();
              setTriggerListing((p) => p + 1);
            }}
            extraClasses={"w-full"}
          >
            Clear
          </CTAButton>
        </div>
      </div>
      <div className="">
        <div>
          <PfmCreate
            addRule={addRule}
            showModal={showModal}
            handleClose={handleClose}
          />
        </div>
      </div>
      {responseID === true ? (
        <div className="mb-2">
          <button
            type="button"
            onClick={() => {
              handleClearFilter();
              setTriggerListing((p) => p + 1);
            }}
            className="flex gap-0 justify-center items-center w-fit pl-1 pr-2 py-1 text-xs rounded-xl border shadow hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <SVGDeleteIcon className="h-4 w-6 hover:stroke-red-700" /> Clear all
            filters
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
  console.log(data)
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
                Type
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
            {data.map((item, ind) => (
              <tr
                key={ind}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-3 py-3">{item.match}</td>
                <td className="px-3 py-3">{item.field}</td>
                <td className="px-3 py-3">{item.type}</td>
                <td className="px-3 py-3">{item.btsCategory}</td>
                <td className="px-3 py-3">{item.level}</td>
                <td className="px-3 py-3">{item.movement}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="px-6 py-4">No contacts found</p>
      )}

      {isEditFormOpen && (
        <PfmEdit
          item={editItem}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditFormOpen(false)}
        />
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
            <div className="">{FragmentSurveyFilter()}</div>
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
