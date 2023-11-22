import React, { useState, useEffect, memo } from "react";
import "../App.css";
import Store from "../Common/Store";
import Image from "./Image";
import { roses } from "../dataBase/config";
import { getDocs } from "firebase/firestore";

const Section = memo(({ sectionNumber }) => {

  const [numImages] = useState(140);
  const [sectionHeight, setSectionHeight] = useState(0);
  const startDate = new Date(new Date().getFullYear(), 9, 7);
  const currentDate = new Date();
  const [dates, setDates] = useState([]);
  const [blogs, setBlogs]= useState([]);
  useEffect(() => {
    const dateArray = [];
    let currentDatePointer = new Date(startDate);

    while (currentDatePointer <= currentDate) {
      dateArray.push(new Date(currentDatePointer));
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }

    setDates(dateArray);
  }, []);

  useEffect(() => {
    // Calculate the section's height based on the number of images
    const calculatedHeight = 100 + numImages * 1;
    setSectionHeight(calculatedHeight);
  }, [numImages]);
 
  const fetchData = () => {
    getDocs(roses)
      .then((res) => {
        console.log(res.docs);
        const blogs = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
  
        // Sort blogs based on the data.date property
        blogs.sort((a, b) => {
          const dateA = new Date(a.data.date);
          const dateB = new Date(b.data.date);
  
          return dateA - dateB;
        });
  
        setBlogs(blogs);
        console.log(blogs, "blogs");
      })
      .catch((err) => console.log(err.message));
  };
  
  
   useEffect(()=>{
    fetchData()
   },[])


  return (
    <>
      {dates.map((date, index) => (
        <div className="section" style={{ height: sectionHeight }} key={index}>
          <div className="section-number">
            <div className="section-numberT">
              <span className="dash">_</span>
              {date.toLocaleString("default", { month: "short" })}{" "}
              {date.getDate()}
            </div>
            <h1 className="title">
              <div className="title">{blogs[index]?.data?.numberOfRoses || 0} </div>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
            </h1>
          </div>
          <div className="section-image" >

            {Array.from({ length: (blogs[index]?.data?.numberOfRoses || 0) }).map((_, i) => (
              <Image
                key={i}
                url={Store.getImage().url}
                top={Math.random()  * (sectionHeight - 100)}
                left={Math.random() * 90}
                date={date}
                index={i}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
});

export default Section;
