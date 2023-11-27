import "../assets/css/form.css";
import seeds from "../assets/imags/formseeds.png";
import f from "../assets/imags/formf.png";
import { useEffect, useState } from "react";
import Select from "react-select";

const Form = () => {
  const [countries, setCountries] = useState([]);
  
    const stylesSelect = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "#4d4d4d",
        border: "none",
        padding: "6px 12px",
        borderRadius: 0,
        color: "white",
      }),
      input: (styles) => ({
        ...styles,
        // backgroundColor: "#4d4d4d",
        color: "white",
      }),
      placeholder: (styles) => ({
        ...styles,
        color: "white",
      }),
      option: (styles, { isSelected }) => ({
        backgroundColor: "#4d4d4d",
        color: isSelected ? "red" : "white",
        padding: "10px",
        overflowY: "scroll",
      }),
      singleValue: (styles) => ({
        ...styles,
        color: "white",
      }),
      menu: styles => ({
        ...styles,
        overflowY: "scroll",
        backgroundColor:'none'
      })
    };
  useEffect(() => {
    async function c() {
      const respons = await fetch(
        "https://api.eveschildren48.com/country/read"
      );
      let data = await respons.json();
      console.log(data);
      data = data.records.map((r) => ({
        value: r.countrycode,
        label: r.countryname,
      }));

      setCountries(data);
    }

    c();
  }, []);
  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="content">
              <div className="col-6">
                <h3 className="font-code-new-roman">
                  Plant a rejection <span className="text-green-400">seed</span>{" "}
                  to <span className="text-red-400">Save</span>
                  Palestinan Children
                </h3>
              </div>
              <div className="col-3 f-h-img">
                <img src={seeds} alt="seeds" />
              </div>
            </div>
          </div>
          <div className="form-body">
            <form id="form">
              <div className="relative row flex items-align-start justify-space-between">
                <div className="col-8">
                  <div className="form-group grid-1 mb-5">
                    <input
                      type="text"
                      placeholder="name"
                      className="form-control gray-300"
                    />
                    <Select options={countries} styles={stylesSelect} placeholder="Country"  />

                    <textarea
                      className="gray-300"
                      name="message"
                      id=""
                      cols="42"
                      rows="1"
                      placeholder="Say some thing ... ( 100 Characters )"
                    ></textarea>
                  </div>
                  <div className="form-group grid-2">
                    <input
                      className="gray-300"
                      type="text"
                      placeholder="search"
                    />
                    <input
                      className="gray-300"
                      type="text"
                      placeholder="invite others @"
                    />
                    <button className="btn">invite</button>
                  </div>
                </div>
                <div className="col-2 f">
                  <img src={f} alt="" />
                </div>
                <div className="col-2">
                  <button className="btn-green text-green-400">protect</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
