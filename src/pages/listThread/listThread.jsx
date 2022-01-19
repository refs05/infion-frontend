import Footer from "../../components/footer/footer";
import { Header, HeaderLogged } from "../../components/header/header";
import Leaderboard from "../../components/leaderboard/leaderboard";
import orderBullet from "../../assets/img/bulletFilter.svg";
import like from "../../assets/img/love.svg";
import comment from "../../assets/img/comment.svg";
import "./listThread.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/search/search";

const ListThread = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filteredThread, setFilteredThread] = useState([]);
    const [filter, setFilter] = useState("");
    const [category, setCategory] = useState("");
    console.log(filter)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(`http://localhost:8000/threads/list/`);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const [followThreads, setFollowThreads] = useState({
        user_id: 2,
        thread_id: 2,
    });

    const handleFollowThreads = (e) => {

        e.preventDefault();
        setFollowThreads({
            user_id: 2,
            thread_id: parseInt(e.target.id),
        })
        
        axios
            .post(`http://localhost:8000/followThreads/create`, followThreads)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(`http://localhost:8000/threads/list/?category=${category}&sortBy=${filter}`);
                setFilteredThread(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, [filter, category]);

    function onChangeFilter(event) {
        setFilter(event.target.value);
    }

    function viewMore(a) {
        return function() {
            setFilter(a)
        }
    }

    function onChangeCategory(event) {
        setCategory(event.target.value);
    }

    // function timeSince(datetime) {
    //     var now = new Date(),
    //         secondsPast = (now.getTime() - Date.parse(datetime)) / 1000;

    //     if (secondsPast < 60) {
    //         return Math.round(secondsPast) + " seconds ago";
    //     }
    //     if (secondsPast < 3600) {
    //         return parseInt(secondsPast / 60) + " mins ago";
    //     }
    //     if (secondsPast <= 86400) {
    //         return parseInt(secondsPast / 3600) + " hours ago";
    //     }
    //     if (secondsPast <= 2628000) {
    //         return parseInt(secondsPast / 86400) + " days ago";
    //     }
    //     if (secondsPast <= 31536000) {
    //         return parseInt(secondsPast / 2628000) + " months ago";
    //     }
    //     if (secondsPast > 31536000) {
    //         return parseInt(secondsPast / 31536000) + " years ago";
    //     }
    // }

    return (
        <>
            <Header />
            <Search data={data} />
            <div className="container m-auto row">
                <div className="leftContent col-sm-2">
                    <div className="filter border rounded-3 p-3 mb-4">
                        <div className="title d-flex justify-content-center mb-1">Filter</div>
                        <div className="content">
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    value=""
                                    checked={filter === ""}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    None
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault5"
                                    value="like_count desc"
                                    checked={filter === "like_count desc"}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault5">
                                    By Like
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault6"
                                    value="comment_count desc"
                                    checked={filter === "comment_count desc"}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault6">
                                    By Comment
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault7"
                                    value="follower_count desc"
                                    checked={filter === "follower_count desc"}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault7">
                                    By Follower
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    value="created_at asc"
                                    checked={filter === "created_at asc"}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault2">
                                    Oldest
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault3"
                                    value="created_at desc"
                                    checked={filter === "created_at desc"}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault3">
                                    Newest
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault4"
                                    value="like_count desc"
                                    checked={filter === "like_count desc"}
                                    onChange={onChangeFilter}
                                />
                                <label className="form-check-label" for="flexRadioDefault4">
                                    Top Threads
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="category border rounded-3 p-3">
                        <div className="title d-flex justify-content-center mb-1">Category</div>
                        <div className="content">
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault17"
                                    value=""
                                    checked={category === ""}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault17">
                                    None
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault9"
                                    value="health"
                                    checked={category === "health"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault9">
                                    Health
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault10"
                                    value="science"
                                    checked={category === "science"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault10">
                                    Science
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault11"
                                    value="technology"
                                    checked={category === "technology"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault11">
                                    Technology
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault12"
                                    value="lifestyle"
                                    checked={category === "lifestyle"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault12">
                                    Lifestyle
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault13"
                                    value="game"
                                    checked={category === "game"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault13">
                                    Game
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault14"
                                    value="sport"
                                    checked={category === "sport"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault14">
                                    Sport
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault15"
                                    value="food"
                                    checked={category === "food"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault15">
                                    Food
                                </label>
                            </div>
                            <div className="mb-1 form-check">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    name="flexRadioDefaults"
                                    id="flexRadioDefault16"
                                    value="music"
                                    checked={category === "music"}
                                    onChange={onChangeCategory}
                                />
                                <label className="form-check-label" for="flexRadioDefault16">
                                    Music
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {filter == "" && category == "" ? (
                    <div className="mainContent col-sm-7">
                        <div className="bag mb-4">
                            <div className="head d-flex justify-content-between align-items-end mb-1 px-2">
                                <div className="title fs-5">Top Threads</div>
                                <div className="viewmore" type="button" value="like_count desc"
                                    onClick={viewMore("like_count desc")}>View more...</div>
                            </div>
                            <div class="card-group">
                                {data?.data?.slice(0, 3).map((item, index) => (
                                    <div class="card bg-transparent p-2 border-0" key={index}>
                                        <Link to={`/forum/${item.id}-${item.title.toLowerCase().replace(/\s/g, "-")}`} className="link">
                                            <img src={item.img} alt="..." className="card-img-top adjust mb-1" />
                                            <div className="wrapText my-2 fs-6">
                                                {item.title.length >= 68 ? item.title.slice(0, 68) + "...." : item.title}
                                            </div>
                                        </Link>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <div className="like d-flex align-items-center me-3">
                                                    <img src={like} alt="" />
                                                    {item.like_count}
                                                </div>
                                                <div className="comment d-flex align-items-center">
                                                    <img src={comment} alt="" />
                                                    {item.comment_count}
                                                </div>
                                            </div>
                                            <div className="follow d-flex align-items-center" type="button"  id={item?.id} onClick={handleFollowThreads}>Follow</div>
                                        </div>
                                        <p class="card-text text-end">
                                            <small class="text-muted">{new Date(item.created_at).toDateString()}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bag mb-4">
                            <div className="head d-flex justify-content-between align-items-end mb-1 px-2">
                                <div className="title fs-5">Newest Threads</div>
                                <div className="viewmore" type="button" value="created_at desc"
                                    onClick={viewMore("created_at desc")}>View more...</div>
                            </div>
                            <div class="card-group">
                                {data?.data?.slice(0, 3).map((item, index) => (
                                    <div class="card bg-transparent p-2 border-0" key={index}>
                                        <Link to={`/forum/${item.id}-${item.title.toLowerCase().replace(/\s/g, "-")}`} className="link">
                                            <img src={item.img} alt="..." className="card-img-top adjust mb-1" />
                                            <div className="wrapText my-2 fs-6">
                                                {item.title.length >= 68 ? item.title.slice(0, 68) + "...." : item.title}
                                            </div>
                                        </Link>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <div className="like d-flex align-items-center me-3">
                                                    <img src={like} alt="" />
                                                    {item.like_count}
                                                </div>
                                                <div className="comment d-flex align-items-center">
                                                    <img src={comment} alt="" />
                                                    {item.comment_count}
                                                </div>
                                            </div>
                                            <div className="follow d-flex align-items-center" type="button" id={item?.id} onClick={handleFollowThreads}>Follow</div>
                                        </div>
                                        <p class="card-text text-end">
                                            <small class="text-muted">{new Date(item.created_at).toDateString()}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bag mb-4">
                            <div className="head d-flex justify-content-between align-items-end mb-1 px-2">
                                <div className="title fs-5">Recommendation Threads</div>
                                <div className="viewmore" type="button" value="follower_count desc"
                                    onClick={viewMore("follower_count desc")}>View more...</div>
                            </div>
                            <div class="card-group">
                                {data?.data?.slice(0, 3).map((item, index) => (
                                    <div class="card bg-transparent p-2 border-0" key={index}>
                                        <Link to={`/forum/${item.id}-${item.title.toLowerCase().replace(/\s/g, "-")}`} className="link">
                                            <img src={item.img} alt="..." className="card-img-top adjust mb-1" />
                                            <div className="wrapText my-2 fs-6">
                                                {item.title.length >= 68 ? item.title.slice(0, 68) + "...." : item.title}
                                            </div>
                                        </Link>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <div className="like d-flex align-items-center me-3">
                                                    <img src={like} alt="" />
                                                    {item.like_count}
                                                </div>
                                                <div className="comment d-flex align-items-center">
                                                    <img src={comment} alt="" />
                                                    {item.comment_count}
                                                </div>
                                            </div>
                                            <div className="follow d-flex align-items-center" type="button" id={item?.id} onClick={handleFollowThreads}>Follow</div>
                                        </div>
                                        <p class="card-text text-end">
                                            <small class="text-muted">{new Date(item.created_at).toDateString()}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mainContent col-sm-7">
                        <div className="bag mb-4">
                            <div className="head d-flex justify-content-between align-items-end mb-1 px-2">
                                <div className="title fs-5">Result </div>
                            </div>
                            <div class="d-flex flex-wrap">
                                {filteredThread?.data?.map((item, index) => (
                                    <div class="card bg-transparent p-2 border-0" key={index}>
                                        <Link to={`/forum/${item.id}-${item.title.toLowerCase().replace(/\s/g, "-")}`} className="link">
                                            <img src={item.img} alt="..." className="card-img-top adjust mb-1" />
                                            <div className="wrapText my-2 fs-6">
                                                {item.title.length >= 68 ? item.title.slice(0, 68) + "...." : item.title}
                                            </div>
                                        </Link>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <div className="like d-flex align-items-center me-3">
                                                    <img src={like} alt="" />
                                                    {item.like_count}
                                                </div>
                                                <div className="comment d-flex align-items-center">
                                                    <img src={comment} alt="" />
                                                    {item.comment_count}
                                                </div>
                                            </div>
                                            <div className="follow d-flex align-items-center" type="button"  id={item.id} onClick={handleFollowThreads}>Follow</div>
                                        </div>
                                        <p class="card-text text-end">
                                            <small class="text-muted">{new Date(item.created_at).toDateString()}</small>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="rightContent col-sm-3">
                    <Leaderboard/>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ListThread;
