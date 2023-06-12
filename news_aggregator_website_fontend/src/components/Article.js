import React from 'react'

export default function Article({ details }) {

    const formatDate = (date) => {
        const dateTime = new Date(date);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="mentor-widget">
                    <div className="user-info-left">
                        <div className="mentor-img">
                            <a href="#">
                                <img src={(details?.imageUrl=='' ||details?.imageUrl==null) ? require('../assets/img/notFound.jpg') :details?.imageUrl} className="img-fluid" alt="User Image" />
                            </a>
                        </div>
                        <div className="user-info-cont">
                            <h4 className="usr-name"><a href="#">{details?.title}</a></h4>
                            <p className="mentor-type">{details?.paragraph?.length > 200 ? details?.paragraph?.slice(0, 200) + '...' : details?.paragraph}</p>
                            <p className="user-location"><i className="fas fa-clock"></i> {formatDate(details?.date)}</p>
                        </div>

                    </div>
                    <div className="user-info-right">
                        <div className="user-infos">
                            <ul>
                                <li><i className="fas fa-user"></i>{details?.author?.length>20 ? details?.author?.slice(0, 20) : details?.author}</li>
                                <li><i className="fas fa-stream"></i> {details?.category}</li>
                                <li><i className="fas fa-book"></i> {details?.source} </li>
                            </ul>
                        </div>
                        <div className="mentor-booking">
                            <a className="apt-btn" href="#">Show Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
