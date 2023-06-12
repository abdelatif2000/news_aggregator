import Article from '../components/Article';
import axios from 'axios';
import InputCheckbox from '../components/InputCheckbox';
import React, { useEffect, useState } from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import axiosClient from '../axios-client';



export default function Home() {
  const [articales, setArticales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  /* 
  source takes  just on value of these values :
   1 - nytimes
   2 - newsapi
   3 - guardian 
*/
  const [source, setSource] = useState("nytimes");


  useEffect(() => {
    axiosClient.get('/preference')
      .then(({ data }) => {
        //authors : 
        let authors = JSON.parse(data?.userPreferences?.authors);

        //categories :
        let categories = JSON.parse(data?.userPreferences?.categories);
        let prefercategories = "";
        for (let [key, value] of Object.entries(categories)) {
          if (value === true) {
            prefercategories += "%" + key;
          }
        }

        let sources = JSON.parse(data?.userPreferences?.sources);
        if (sources?.newYorkTimes === true) {
          setSource("nytimes");
        } else if (sources?.newsAPI === true) {
          setSource("newsapi");
        } else if (sources?.theGuardian === true) {
          setSource("guardian");
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  const fetchArticles = async () => {
    let params;
    let baseURL;
    //define the baseurl and and its params
    if (source === "nytimes") {
      baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      params = {
        q: search === "" ? category : search,
        begin_date: date,
        "page-size": size,
        "page": page,
        "api-key": '8mTGw4vmb0GdIH3lxW2SrfrPdAnC3rEy'
      }
    } else if (source === "newsapi") {
      baseURL = "https://newsapi.org/v2/everything";
      params = {
        sources: 'bbc-news',
        from: date,
        "page-size": size,
        "page": page,
        q: search === "" ? category : search,
        apiKey: "bb53fd512c9445e7953bb696079bb24c"
      }
    } else {
      baseURL = "https://content.guardianapis.com/search";
      params = {
        q: search === "" ? category : search,
        "from-date": date,
        "page-size": size,
        "page": page,
        "api-key": "d85e8d98-b83f-4a15-89e3-53a62ebf9f91"
      }
    }


    //make the request and get the news  
    try {
      setLoading(true);
      await axios.get(
        baseURL,
        {
          params
        }
      ).then((response) => {
        let data = [];
        // praper the news base on the source :
        if (source === "nytimes") {
          response?.data?.response?.docs?.forEach(article => {
            data = [...data, {
              title: article?.abstract,
              category: article?.news_desk,
              paragraph: article?.lead_paragraph,
              date: article?.pub_date,
              imageUrl: "https://www.nytimes.com/" + article?.multimedia[0]?.url,
              author: article?.byline?.original,
              source: "New York Times"
            }]
          });
        } else if (source === "newsapi") {
          response?.data?.articles?.forEach(article => {
            data = [...data, {
              title: article?.title,
              category: "Not defined",
              paragraph: article?.content,
              date: article?.publishedAt,
              imageUrl: article?.urlToImage,
              author: article?.author == null ? "Not defined" : article?.author,
              source: "NewsAPI"
            }]
          });
        } else {
          response?.data?.response?.results?.forEach(article => {
            data = [...data, {
              title: article?.webTitle,
              category: article?.sectionName,
              paragraph: article?.content,
              date: article?.webPublicationDate,
              imageUrl: article?.urlToImage,
              author: article?.author == null ? "Not defined" : article?.author,
              source: "The Guardian"
            }]
          });
        }
        setArticales(data);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    fetchArticles();
  }, [source, search, category, date, page]);

  return (
    <div className="main-wrapper">

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="card search-filter" >
                <div className="card-header">
                  <h4 className="card-title mb-0">Search Filter</h4>
                </div>
                <div className="card-body">
                  <div className="filter-widget">
                    <div className="cal-icon">
                      <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control datetimepicker" placeholder="Search by keywords" />
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Date</h4>
                    <DateTimePicker
                      className="form-control datetimepicker"
                      disableClock={false}
                      yearPlaceholder='yyyy'
                      dayPlaceholder='dd'
                      monthPlaceholder='mm'
                      format="yyyy-MM-dd"
                      calendarIcon={null}
                      onChange={setDate}
                      value={date}
                    />
                  </div>

                  <div className="filter-widget">


                    <h4>Source</h4>
                    <InputCheckbox
                      label={"New York Times"}
                      isChecked={source === 'nytimes' ? true : false}
                      setCheckBox={() => setSource("nytimes")}
                    />
                    <InputCheckbox
                      label={"The Guardian"}
                      isChecked={source === 'guardian' ? true : false}
                      setCheckBox={() => setSource("guardian")}
                    />
                    <InputCheckbox
                      label={"NewsAPI"}
                      isChecked={source === 'newsapi' ? true : false}
                      setCheckBox={() => setSource("newsapi")}
                    />
                  </div>
                  <div className="filter-widget">
                    <h4>Category</h4>
                    <InputCheckbox
                      label={"All"}
                      isChecked={category === "" ? true : false}
                      setCheckBox={() => setCategory("")}
                    />
                    <InputCheckbox
                      label={"Football"}
                      isChecked={category === "football" ? true : false}
                      setCheckBox={() => setCategory("football")}
                    />
                    <InputCheckbox
                      label={"Films"}
                      isChecked={category === "films" ? true : false}
                      setCheckBox={() => setCategory("films")}
                    />
                    <InputCheckbox
                      label={"Music"}
                      isChecked={category === "music" ? true : false}
                      setCheckBox={() => setCategory("music")}
                    />
                    <InputCheckbox
                      label={"AI"}
                      isChecked={category === "AI" ? true : false}
                      setCheckBox={() => setCategory("AI")}
                    />
                    <InputCheckbox
                      label={"Books"}
                      isChecked={category === "books" ? true : false}
                      setCheckBox={() => setCategory("books")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-9">
              {loading ?
                (
                  <p><div className="load-more text-center">
                    <a className="btn btn-primary btn-sm" href="#">Loading...</a>
                  </div> </p>
                )
                :
                (
                  Object.entries(articales).map(([key, value]) => (
                    <Article key={key}
                      details={value}
                    />
                  ))
                )
              }
              {
                loading === false && (
                  <p> <div className="load-more text-center">
                    <a className="btn btn-primary btn-sm mr-5" style={{ marginRight: "10px", width: "80px",opacity:page===1  ?'0.5' :'1' }} onClick={() => (page > 1 && setPage(page - 1))} href="#">Previous</a>
                    <a className="btn btn-primary btn-sm" style={{ marginRight: "10px", width: "80px" }} onClick={() => setPage(page + 1)} href="#">Next</a>
                  </div> </p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
