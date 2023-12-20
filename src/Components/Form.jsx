import "../assets/css/form.css";
import "../assets/css/responsive/form.css";
import { useEffect, useRef, useState, useMemo } from "react";
import Select from "react-select";
import AnimatedSvgPath from "./AnimatedSvgPath";
import seed3 from "../assets/imags/3.png";
import { interploate } from "../Common/functions";
import { form_flower as paths } from "../Common/animatedSvgPath";
import { svgFill } from "../Common/svgFill";
//@TODO: Renname from input handler function to be realted to input state name
const Form = (props) => {
  const options = {
    viewBox: [1045, 194],
    d: "M16.0801 173.66V3.66984L73.6801 173.66V4.45984M184.49 3.66984L132.23 3.85984V175.05H184.49M132.23 96.9598H181M380.76 3.85984H331.23V175.05H383.49M331.23 93.9598H381M213.23 3.83984L236.6 174.55L259.38 174.66L279.24 3.66984M422.28 175.66V5.83984C422.28 5.83984 476.23 9.83985 477.23 56.8398C476.23 93.8398 465.294 89.8308 465.294 89.8308M465.294 89.8308C491.489 123.562 476.23 124.84 477.6 175.66M465.294 89.8308H441.686M569.36 175.66L574.53 140.58L586.85 4.66984H612.02L630.89 175.66M625.32 140.25H574.53M796.36 175.66L799.53 140.58L810.85 4.66984H838.02L855.89 175.66M851.32 140.25H799.53M737.99 66.7698C739.23 33.8398 737.23 1.83984 710.23 1.83984C678.23 1.83984 678.23 50.9998 678.23 96.8398C678.23 142.68 678.23 175.84 711.23 175.84C733.17 175.84 741.23 162.74 741.23 137.84L742.23 103.84H714.23M741.23 175.84V144.48M908.03 5.66984V175.66M971.28 175.44V5.45984L1025.88 175.44L1028.88 5.24984",
    strokeWidth: 30,
    itemsPerRow: 5,
    radius: 7,
  };

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contrycode: "",
    email: "",
    invites: "",
    message: "hello from other side",
  });
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState({
    rightleaf: false,
    leftleaf: false,
    plantstem: false,
    flowerleaf1: false,
    flowerleaf2: false,
    flowerleaf3: false,
    flowerleaf4: false,
    flowerreddot: false,
  });

  const [play, setPlay] = useState(false);
  const formRef = useRef(null);
  const counter = useRef(0);
  const flowerRef = useRef(null);

  const [f, setF] = useState([]);

  const $postions = useRef([]);
  const svg = useMemo(() => svgFill(options), []);

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
      // overflowY: "scroll",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
    }),
    menu: (styles) => ({
      ...styles,
      // overflowY: "scroll",
      backgroundColor: "none",
    }),
  };
  useEffect(() => {
    async function c() {
      try {
        console.log("wsss");
        const respons = await fetch(
          "https://api.eveschildren48.com/country/read"
        );
        let data = await respons.json();
        data = data.records.map((r) => ({
          value: r.countrycode,
          label: r.countryname,
        }));

        setCountries(data);
      } catch ({ e, message }) {
        handleError(message);
        setCountries([{ value: "ps", label: "Palestine" }]);
      }
    }

    c();
  }, []);

  function handleError(error, time = 3000) {
    setError(error);
    setTimeout(() => setError(null), time);
  }

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

    setF((prev) => [...prev, svg.fill(counter.current, f)]);
    // console.log()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // handle_filled();
    try {
      formData.invites ? split_invites(formData.invites) : ""; 

      split_invites(formData.invites).map(
        (inv, i) => (formData[`friend_mail_${i+1}`] = inv)
      );

      delete formData.invites;

      console.log(formData)

      const apiUrl = "https://api.eveschildren48.com/solidarity/create";
      const response = await fetch(apiUrl, {
        method: "POST",
        // headers: {
        //  "Access-Control-Allow-Origin":'*',
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(formData),
      });
      //@TODO: move to error handler function;
      if (response.ok) {
        // handle_filled();
        handleFlowerSubmitTransform();
        console.log("Form data successfully submitted to the backend!");
        handleError("Form data successfully submitted");
        setFormData({
          name: "",
          email: "",
          country: "",
          invites: "",
        });
        // Optionally, you can handle the success response here
      } else {
        console.error("Failed to submit form data to the backend");
        handleError("Failed to submit form data to the backend");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      handleError("Error during form submission");
    }
  };

  function handleOpacityBasedOnInputValue(value, el, decress = true) {
    let opacity = decress ? 1 : 0;

    if (value.length > 5) {
      opacity = decress ? 0.3 : 1;
    } else {
      opacity = decress
        ? opacity - interploate(value.length, 10, 0, 1, 0)
        : opacity + interploate(value.length, 10, 0, 1, 0);
    }
    el.style.setProperty("--apperance", opacity);
  }

  function handelInviteSeed(e) {
    const value = e.target.value;
    const seed = value && split_invites(value).length + 1;
    const invite_value =
      value && split_invites(value)[split_invites(value).length - 1];

    if (seed > 4) {
      return;
    }

    setFormData((prev) => ({ ...prev, invites: e.target.value }));

    if (value.length === 0) {
      formRef.current
        .querySelectorAll(".seeds > img:not(:first-child)")
        .forEach((item) => item.style.setProperty("--apperance", 1));
    }

    handleOpacityBasedOnInputValue(
      invite_value,
      formRef.current.querySelector(`.seeds .seed-${seed}`)
    );
  }
  function handleName(e) {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));

    handleOpacityBasedOnInputValue(
      e.target.value,
      formRef.current.querySelector("#svgEl"),
      false
    );

    if (e.target.value.length === 1)
      setAnimate((prev) => ({ ...prev, rightleaf: true }));
  }

  function handleCountry({ value, label }) {
    if (value && label) {
      setFormData((prev) => ({ ...prev, contrycode: value }));
      setAnimate((prev) => ({ ...prev, leftleaf: true, plantstem: true }));
    }

    console.log(animate);
  }

  async function handleEmail(e) {
    handleOpacityBasedOnInputValue(
      e.target.value,
      formRef.current.querySelector(`.seeds .seed-1`)
    );
    setFormData((prev) => ({ ...prev, email: e.target.value }));

    if (e && e.target.value.length === 2) {
      setAnimate((prev) => ({
        ...prev,
        flowerreddot: true,
        flowerleaf1: true,
        flowerleaf2: true,
        flowerleaf3: true,
        flowerleaf4: true,
      }));

      if (e && e.target.value.length <= 0) {
        //   // revers animation
      }
    }
  }

  function handleFlowerSubmitTransform(e = null) {
    // e.preventDefault();

    const fParent =
      flowerRef.current.parentElement.parentElement.getBoundingClientRect();
    const scale = 1200 / 1084;
    //Top postion = (flowerHeight * scale) + (flowerFromBottom + containermargin) + flowerTopPostion
    const postiosn = svg.fill(counter.current, $postions.current);
    const { top, bottom, left, right, height, width } =
      flowerRef.current.getBoundingClientRect();
    // console.log(postiosn);
    const offset =
      counter.current >= 30 ? counter.current * 1.7 : counter.current * 0.2;
    const topPosition =
      height * 0.49 + (postiosn.y * scale + 100) + postiosn.y * scale;
    const x = postiosn.x * scale + 150 - left;

    flowerRef.current.style.transition = "transform 2s";
    flowerRef.current.style.transform = `translate(${x}px ,${
      topPosition + offset + -20
    }px)  scale(.2)`;
    handle_filled(counter.current);

    counter.current += 1;

    setTimeout(() => {
      flowerRef.current.style.transition = "none";
      flowerRef.current.style.transform = "initial";
    }, 2300);
  }

  useEffect(() => {
    if (flowerRef) {
      flowerRef.current.addEventLis;
    }
  }, []);

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
            <form
              id="form"
              // onSubmit={handleSubmit}
              method="post"
            >
              <div className="level-1 relative row">
                <div className="span-full flex align-items-start justify-content-start flex-column">
                  <div className="form-group span-full flex flex-col lg-flex-row w-full mb-5">
                    <input
                      type="text"
                      placeholder="name"
                      className="form-control gray-300 lg-grow-2 mb-10 lg-mb-0"
                      name="name"
                      onChange={handleName}
                      value={formData.name}
                    />
                    <Select
                      options={countries}
                      styles={stylesSelect}
                      // value={formData.country}
                      onChange={handleCountry}
                      placeholder="Country"
                      name="contrycode"
                      className="mb-10 lg-grow-1 lg-mb-0"
                      backspaceRemovesValue={true}
                    />
                    {/* EMAIL */}
                    <input
                      className="gray-300 mb-10 lg-mb-0 lg-grow-1"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleEmail}
                    />
                  </div>
                  <div className="form-group span-full flex flex-col lg-flex-row xl-flex-row w-full ">
                    <input
                      className="grow-3 gray-300  mb-10 lg-mb-0"
                      type="text"
                      placeholder="invite others @ seperate emails by comma"
                      title="Sperate emails by comma , example : mail@example.com,second@mail.com"
                      value={formData.invites}
                      onChange={handelInviteSeed}
                    />
                    <button
                      type="submit"
                      className={`grow-1 btn-green text-green-400 sm-block ${
                        formData.email.length <= 0 && "btn-disabled"
                      }`}
                      // disabled={formData.email.length <= 0}
                      onClick={handleFlowerSubmitTransform}
                      // onClick={handle_filled}
                    >
                      Commit
                    </button>
                  </div>
                </div>
                <div className="span-full">
                  <svg
                    ref={flowerRef}
                    className="w-therd md-w-full lg-w-full"
                    height="auto"
                    viewBox="0 0 39 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ "--apperance": 0 }}
                    id="svgEl"
                  >
                    {paths.map((path) => {
                      return (
                        <AnimatedSvgPath
                          fillid={path.name}
                          startColor={path.startcolor}
                          endColor={path.endcolor}
                          from={0}
                          to={1}
                          dur={"1s"}
                          d={path.path}
                          key={path.name}
                          play={animate[path.name]}
                          begin="indefinite"
                          stroke={path.stroke && path.stroke}
                          strokeWidth={path.strokeWidth && path.strokeWidth}
                          strokeMiterlimit={
                            path.strokeMiterlimit && path.strokeMiterlimit
                          }
                          className={`${
                            path.stroke ? "stroke-animate" : "fill-animate"
                          }`}
                        />
                      );
                    })}
                  </svg>
                </div>
                {/* <div className="span-full"></div> */}
                {error && (
                  <div className="error span-full flex align-items-center justify-content-center">
                    <p>{error}</p>
                  </div>
                )}

                {/* <pre>{ JSON.stringify(formData)}</pre> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
