import "../assets/css/form.css";
import seeds from "../assets/imags/formseeds.png";
import f from "../assets/imags/formf.png";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

const Form = (props) => {
  const counter = useRef(0)
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    contrycode: null,
    message: null,
    friend_mail_1: null,
    friend_mail_2: null,
    friend_mail_3: null,
  });
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
    menu: (styles) => ({
      ...styles,
      overflowY: "scroll",
      backgroundColor: "none",
    }),
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

  const handleSubmit = e => {
    e.preventDefault();
    let f = new FormData(e.target);

    // prepare statment 

    for (const [key, value] of f.entries()) {
     
      console.log(key, value)
      
      if (key === 'invite') {
        let a = split_invites(value)
           console.log(a)
      }
    }
    // console.log(f)
  } 

  function split_invites(invites = '') {
     if(invites === '' || invites === " ") throw new Error("Invites empty")
    // convert string to array by splice array by comma 
    
    invites = invites.split(',')

    return invites
    
  }

  function handle_filled() {
    props.setSign(prev => [
      ...prev,
      counter.current
    ]);

    counter.current + 1
    console.log(counter.current)
  }
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
                      name="name"
                    />
                    <Select
                      options={countries}
                      styles={stylesSelect}
                      placeholder="Country"
                      name="contrycode"
                    />

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
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                    <input
                      className="gray-300"
                      type="text"
                      placeholder="invite others @ seperate emails by comma"
                      title="Sperate emails by comma , example : mail@example.com,second@mail.com"
                      name="invite"
                    />
                    <button className="btn">invite</button>
                  </div>
                </div>
                <div className="col-2 f">
                  <img src={f} alt="" />
                </div>
                <div className="col-2">
                  <button onClick={handle_filled} type="button" className="btn-green text-green-400">
                    protect
                  </button>
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
