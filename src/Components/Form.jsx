import "../assets/css/form.css";
import "../assets/css/responsive/form.css";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import seed3 from "../assets/imags/3.png";
import { interploate } from "../Common/functions";

const Form = (props) => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const counter = useRef(0);

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
      data = data.records.map((r) => ({
        value: r.countrycode,
        label: r.countryname,
      }));

      setCountries(data);
    }

    c();
  }, []);

  function split_invites(invites = "") {
    if (invites === "" || invites === " ") throw new Error("Invites empty");
    // convert string to array by splice array by comma
    invites = invites.split(",");

    return invites;
  }

  function handle_filled() {
    console.log("in", counter.current);
    props.setSign(counter.current);
    counter.current += 1;
    // console.log()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to handle form data
      const formData = new FormData(e.target);

      // Convert FormData to an object
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Log the form data object
      // console.log(formObject);
      // Replace the following URL with your backend API endpoint
      const apiUrl = "https://api.eveschildren48.com/solidarity/create";
      const response = await fetch(apiUrl, {
        method: "POST",
        // headers: {
        //  "Access-Control-Allow-Origin":'*',
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(formObject),
      });

      if (response.ok) {
        handle_filled();
        console.log("Form data successfully submitted to the backend!");
        setError("Form data successfully submitted");
        setTimeout(() => setError(null) , 3000)
        // Optionally, you can handle the success response here
      } else {
        console.error("Failed to submit form data to the backend");
        setTimeout(() => setError(null), 3000);
        // Optionally, you can handle the error response here
        setError("Failed to submit form data to the backend");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Error during form submission");
      setTimeout(() => setError(null), 3000);
    }
  };

  function handleSeed(e, _seed) {
    // change opacity of seed while typeing
    let seed = formRef.current.querySelector(`.seeds .seed-${_seed}`);
    console.log(seed);
    let opacity = 1;
    if (e.target.value.length > 5) {
      opacity = 0.3;
    } else {
      opacity = opacity - interploate(e.target.value.length, 10, 1, 1, 0);
    }
    seed.style.setProperty("--apperance", opacity);
    //
  }

  function handelInviteSeed(e) {
    const value = e.target.value;
    const seed = value && split_invites(value).length + 1;
    const invite_value = split_invites(value)[split_invites(value).length - 1]; 

    
    if (seed > 4) {
      return;
    }

    if (value.length === 0) {
      formRef.current
        .querySelectorAll(".seeds > img:not(:first-child)")
        .forEach((item) => item.style.setProperty("--apperance", 1));
    }
    const seedElement =
      seed && formRef.current.querySelector(`.seeds .seed-${seed}`);

    let opacity = 1;
    if (seedElement) {
      if (invite_value.length > 5) {
        opacity = 0.3;
      } else {
        // check if last invite 
        // if (split_invites(value).length === 3) handleRose();
        opacity =
          opacity -
          interploate(
            invite_value.length,
            10,
            1,
            1,
            0
          );
      }
      seedElement.style.setProperty("--apperance", opacity);
    }
  }

  function handleName(e) {
    if (e.target.value.length === 1) {
      formRef.current
        .querySelector(".leaf-right")
        .setAttribute("fill", "url(#l-in)");
      formRef.current.querySelector(".l-in").beginElement();
      return;
    }
    if (e.target.value.length === 0) {
      formRef.current
        .querySelector(".leaf-right")
        .setAttribute("fill", "url(#l-out)");
      formRef.current.querySelector(".l-out").beginElement();
    }
  }

  function handleCountry({ value, label }) {
    if (value && label) {
      formRef.current
        .querySelector(".leaf-left")
        .setAttribute("fill", "url(#left-in)");
      formRef.current.querySelector(".left-in").beginElement();
    }
  }

  async function handleRose(e = null) {
     handleSeed(e,1)
    if (e && e.target.value.length === 2) {
      await new Promise((resole) => {
        formRef.current
          .querySelectorAll(".flower-rose")
          .forEach((item) => item.setAttribute("fill", "url(#f-in)"));
        resole(formRef.current);
      });
      formRef.current.querySelector(".f-in").beginElement();
    }
  }
  return (
    <>
      <div ref={formRef} className="form-main">
        <div className="container">
          <div className="form-header">
            <div className="content flex flex-col md-flex-row lg-flex-row align-items-start">
              <div className="lg-grow-2">
                <h3 className="text-center md-text-left lg-text-left font-code-new-roman">
                  Plant a rejection <span className="text-green-400">seed</span>{" "}
                  to <span className="text-red-400">Save</span>
                  Palestinan Children
                </h3>
              </div>
              <div className="seeds lg-grow-1 ">
                <img
                  className="seed seed-1"
                  src={seed3}
                  style={{
                    "--apperance": 1,
                    opacity: "var(--apperance)",
                  }}
                  alt="seeds"
                />
                <img
                  className="seed-2"
                  style={{
                    "--apperance": 1,
                    opacity: "var(--apperance)",
                  }}
                  src={seed3}
                  alt=""
                />
                <img
                  className="seed-3"
                  style={{
                    "--apperance": 1,
                    opacity: "var(--apperance)",
                  }}
                  src={seed3}
                  alt=""
                />
                <img
                  className="seed-4"
                  style={{
                    "--apperance": 1,
                    opacity: "var(--apperance)",
                  }}
                  src={seed3}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="form-body">
            <form id="form" onSubmit={handleSubmit} method="post">
              <div className="level-1 relative row">
                <div className="span-full flex align-items-start justify-content-start flex-column ">
                  <div className="form-group span-full flex flex-col lg-flex-row w-full mb-5">
                    <input
                      type="text"
                      placeholder="name"
                      className="form-control gray-300 lg-grow-2 mb-10 lg-mb-0"
                      name="name"
                      onChange={handleName}
                    />
                    <Select
                      options={countries}
                      styles={stylesSelect}
                      onChange={handleCountry}
                      placeholder="Country"
                      name="contrycode"
                      className="mb-10 lg-grow-1 lg-mb-0"
                    />
                    {/* EMAIL */}
                    <input
                      className="gray-300 mb-10 lg-mb-0 lg-grow-1"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleRose}
                    />
                  </div>
                  <div className="form-group span-full flex flex-col lg-flex-row xl-flex-row w-full ">
                    <input
                      className="grow-3 gray-300  mb-10 md-mb-0 lg-mb-0"
                      type="text"
                      placeholder="invite others @ seperate emails by comma"
                      title="Sperate emails by comma , example : mail@example.com,second@mail.com"
                      name="invite"
                      onChange={handelInviteSeed}
                    />
                    <button
                      type="submit"
                      className="grow-1 btn-green text-green-400 sm-block "
                      // onClick={handle_filled}
                    >
                      Commit
                    </button>
                  </div>
                </div>
                <div className="span-full">
                  <svg
                    className="w-therd md-w-full lg-w-full"
                    height="auto"
                    viewBox="0 0 39 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Animation */}

                    {/* Right in */}
                    <defs>
                      <linearGradient id="l-in">
                        <stop offset="0" stopColor="#8CC63F">
                          <animate
                            className="l-in"
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                        <stop offset="0" stopColor="#000">
                          <animate
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                    {/* Left In */}
                    <defs>
                      <linearGradient id="left-in">
                        <stop offset="0" stopColor="#8CC63F">
                          <animate
                            className="left-in"
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                        <stop offset="0" stopColor="#000">
                          <animate
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                    {/* Flower */}
                    <defs>
                      <linearGradient id="f-in">
                        <stop offset="0" stopColor="white">
                          <animate
                            className="f-in"
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                        <stop offset="0" stopColor="#000">
                          <animate
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                    {/* Reversh animation */}
                    <defs>
                      <linearGradient id="l-out">
                        <stop offset="0" stopColor="#000">
                          <animate
                            className="l-out"
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                        <stop offset="0" stopColor="#8CC63F">
                          <animate
                            // className="l-out"
                            dur="2s"
                            attributeName="offset"
                            fill="freeze"
                            from="0"
                            to="1"
                            restart="always"
                            begin="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>

                    <path
                      hello="nizar"
                      className="leaf-right"
                      d="M21.87 73.0996C21.87 70.1596 23.85 68.4996 24.95 65.8896C26.23 62.8396 27.1 59.6204 28.59 56.6504C29.99 53.8504 31.85 51.3702 33.46 48.7002C34.72 46.6102 36.65 44.9395 37.71 42.7695C36.93 44.3695 37.05 46.1899 36.9 47.9199C36.73 49.9299 36.44 51.9297 36.22 53.9297C35.92 56.5497 35.27 59.44 33.89 61.71C32.23 64.44 29.61 67.0598 26.65 68.3398C25.72 68.7398 24.7 69.0397 23.92 69.7197C23.19 70.3597 21.88 72.1296 21.88 73.0996H21.87Z"
                      // fill="url(#leaf)"
                    />
                    <path
                      className="leaf-left"
                      d="M23.3 60.8398C22.86 58.9398 21.19 58.42 19.62 58C17.74 57.49 16.29 56.42 14.79 55.21C12.38 53.26 10.45 50.73 9.09003 47.96C7.42003 44.55 5.93999 40.8001 4.92999 37.1201C4.23999 34.6201 2.50998 31.2498 0.539978 29.5098C4.00998 32.5698 7.35001 35.78 11.14 38.46C13.62 40.21 15.96 42.91 17.81 45.25C20.42 48.54 21.85 51.9095 22.53 56.0195C23 58.8995 23.74 61.3098 23.35 64.2598"
                      // fill="url(#leaf)"
                    />
                    <path
                      className="plant-stem"
                      d="M23.61 107.98C19.72 99.1705 20.21 87.2399 21.6 76.6699C22.97 66.2999 24.89 56.1202 24.11 45.4102C23.45 36.4102 21.1 27.3698 17.98 19.8398"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      className="flower-rose flower-leaf-1"
                      d="M23.6 18.5191C24.24 14.8291 27.23 11.8199 30.7 10.5299C32.22 9.95989 33.95 9.71942 35.47 10.2994C36.99 10.8794 38.21 12.4297 38.02 14.0397C37.9 15.0297 37.29 15.9197 36.51 16.5397C35.73 17.1597 34.79 17.5698 33.86 17.9098C30.63 19.1098 27.2 19.7592 23.76 19.8492"
                      // fill="white"
                    />
                    <path
                      className="flower-rose flower-leaf-2"
                      d="M20.98 14.5896C19.76 11.9096 19.44 8.81991 20.11 5.94991C20.51 4.19991 21.33 2.45983 22.76 1.36983C24.19 0.279832 26.34 2.75373e-05 27.79 1.07003C28.86 1.85003 29.39 3.20999 29.42 4.52999C29.45 5.84999 29.02 7.13956 28.48 8.33956C27.79 9.84956 26.9 11.2598 25.96 12.6198C24.94 14.0998 23.78 15.59 22.12 16.28"
                      // fill="white"
                    />
                    <path
                      className="flower-rose flower-leaf-3"
                      d="M17.56 17.8899C13.76 15.9699 10.07 13.4607 8.4 9.44067C7.91 8.26067 7.52995 6.9902 7.59995 5.7102C7.67995 4.4302 8.29 3.13047 9.4 2.49047C10.61 1.80047 12.19 2.02047 13.39 2.74047C14.59 3.46047 15.4599 4.61051 16.2199 5.78051C18.6299 9.51051 20.55 13.3604 18.95 17.7004"
                      // fill="white"
                    />
                    <path
                      className="flower-rose flower-lead-4"
                      d="M15.3 21.0396C12.69 22.4096 9.61998 22.8895 6.71998 22.3795C4.94998 22.0695 3.17 21.35 2 19.98C0.830005 18.61 0.439988 16.4793 1.41999 14.9693C2.13999 13.8593 3.47003 13.25 4.78003 13.15C6.09003 13.05 7.41002 13.3992 8.64002 13.8892C10.18 14.4992 11.64 15.3095 13.05 16.1695C14.58 17.1095 16.14 18.1891 16.91 19.8091"
                      // fill="white"
                    />
                    <path
                      className="flower-red-dot"
                      d="M19.63 24.1201C22.8277 24.1201 25.42 21.5278 25.42 18.3301C25.42 15.1323 22.8277 12.54 19.63 12.54C16.4323 12.54 13.84 15.1323 13.84 18.3301C13.84 21.5278 16.4323 24.1201 19.63 24.1201Z"
                      fill="#EC1C24"
                    />
                  </svg>
                </div>
                {/* <div className="span-full"></div> */}
                {error && (
                  <div className="error span-full flex align-items-center justify-content-center">
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
