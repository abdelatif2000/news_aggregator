import React, { useEffect, useState } from 'react'
import InputCheckbox from '../components/InputCheckbox'
import axiosClient from '../axios-client'
import { useNavigate } from 'react-router-dom';

export default function Preference() {

    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();

    // sources
    const [newYorkTimes, setNewYorkTimes] = useState(false)
    const [newsAPI, setNewsAPI] = useState(false)
    const [theGuardian, setTheGuardian] = useState(false)

    // categories:
    const [football, setFootball] = useState(false);
    const [films, setfilms] = useState(false);
    const [music, setmusic] = useState(false);
    const [AI, setAI] = useState(false);
    const [books, setbooks] = useState(false);


    //authors :
    const [matthewCullen, setMatthewCullen] = useState(false);
    const [VanessaFriedman, setVanessaFriedman] = useState(false);
    const [NicholasKristof, setNicholasKristof] = useState(false);
    const [ClaireMoses, setClaireMoses] = useState(false);
    const [MatthewFutterman, setMatthewFutterman] = useState(false);

    //get userPreference :
    useEffect(() => {
        axiosClient.get('/preference')
            .then(({ data }) => {
                //authors : 
                let authors = JSON.parse(data?.userPreferences?.authors);
                setMatthewCullen(authors?.matthewCullen);
                setVanessaFriedman(authors?.VanessaFriedman);
                setNicholasKristof(authors?.NicholasKristof);
                setClaireMoses(authors?.ClaireMoses);
                setMatthewFutterman(authors?.MatthewFutterman);

                //categories :
                let categories = JSON.parse(data?.userPreferences?.categories);
                setFootball(categories?.football);
                setmusic(categories?.music);
                setfilms(categories?.films);
                setAI(categories?.AI);
                setbooks(categories?.books);

                let sources = JSON.parse(data?.userPreferences?.sources);
                setNewYorkTimes(sources?.newYorkTimes);
                setNewsAPI(sources?.newsAPI);
                setTheGuardian(sources?.theGuardian);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);


    //save the Preference :
    const onSubmit = ev => {
        ev.preventDefault()
        const payload = {
            sources: {
                newYorkTimes,
                newsAPI,
                theGuardian
            },
            categories: {
                football,
                films,
                music,
                AI,
                books
            },
            authors: {
                matthewCullen,
                VanessaFriedman,
                NicholasKristof,
                ClaireMoses,
                MatthewFutterman
            },
        }
        axiosClient.post('/preference', payload)
            .then(({ data }) => {
                navigate('/');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })
    }

    return (


        <div className="main-wrapper">
            <div className="content">
                <div className="container-fluid">
                    <div className="card search-filter" >
                        <div className="card-header">
                            <h3 className="card-title mb-0">Preferences</h3>
                        </div>
                        <form onSubmit={onSubmit} className="card-body">
                            <div className='preferences-items'>
                                <div className="filter-widget">
                                    {errors &&
                                        <div className="alert">
                                            {Object.keys(errors).map(key => (
                                                <p key={key}>{errors[key][0]}</p>
                                            ))}
                                        </div>
                                    }
                                    <h4>Source</h4>
                                    <InputCheckbox
                                        label={"New York Times"}
                                        isChecked={newYorkTimes}
                                        setCheckBox={() => setNewYorkTimes(!newYorkTimes)}
                                    />
                                    <InputCheckbox
                                        label={"NewsAPI"}
                                        isChecked={newsAPI}
                                        setCheckBox={() => setNewsAPI(!newsAPI)}
                                    />
                                    <InputCheckbox
                                        label={"The Guardian"}
                                        isChecked={theGuardian}
                                        setCheckBox={() => setTheGuardian(!theGuardian)}
                                    />
                                </div>
                                <div className="filter-widget">
                                    <h4>Category</h4>
                                    <InputCheckbox
                                        label={"Football"}
                                        isChecked={football}
                                        setCheckBox={() => setFootball(!football)}
                                    />
                                    <InputCheckbox
                                        label={"Films"}
                                        isChecked={films}
                                        setCheckBox={() => setfilms(!films)}
                                    />
                                    <InputCheckbox
                                        label={"Music"}
                                        isChecked={music}
                                        setCheckBox={() => setmusic(!music)}
                                    />
                                    <InputCheckbox
                                        label={"AI"}
                                        isChecked={AI}
                                        setCheckBox={() => setAI(!AI)}
                                    />
                                    <InputCheckbox
                                        label={"Books"}
                                        isChecked={books}
                                        setCheckBox={() => setbooks(!books)}
                                    />
                                </div>
                                <div className="filter-widget">
                                    <h4>Authors</h4>
                                    <InputCheckbox
                                        label={"Matthew Cullen"}
                                        isChecked={matthewCullen}
                                        setCheckBox={() => setMatthewCullen(!matthewCullen)}
                                    />
                                    <InputCheckbox
                                        label={"Vanessa Friedman"}
                                        isChecked={VanessaFriedman}
                                        setCheckBox={() => setVanessaFriedman(!VanessaFriedman)}
                                    />
                                    <InputCheckbox
                                        label={"Nicholas Kristof"}
                                        isChecked={NicholasKristof}
                                        setCheckBox={() => setNicholasKristof(!NicholasKristof)}
                                    />
                                    <InputCheckbox
                                        label={"Claire Moses"}
                                        isChecked={ClaireMoses}
                                        setCheckBox={() => setClaireMoses(!ClaireMoses)}
                                    />
                                    <InputCheckbox
                                        label={"Matthew Futterman"}
                                        isChecked={MatthewFutterman}
                                        setCheckBox={() => setMatthewFutterman(!MatthewFutterman)}
                                    />
                                </div>
                            </div>
                            <div className="btn-search">
                                <button type="submit" style={{ width: 'auto', float: 'right' }} className="btn btn-block w-30">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}
