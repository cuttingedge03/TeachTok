// userService.js
import api from './api';
import Answer from './models/Answer';
import Following from './models/Following';
import ForYou from './models/ForYou';

export const getFollowing = () => {
    return api.get(`/following`)
    .then(response => Following.fromJSON(response.data))
    .catch(error => Promise.reject(error));;
};
export const getForYou = () => {
    return api.get(`/for_you`)
    .then(response => ForYou.fromJSON(response.data))
    .catch(error => Promise.reject(error));;
};

export const getRevealAnswers = (id) => {
    return api.get(`/reveal?id=${id}`)
    .then(response => Answer.fromJSON(response.data))
    .catch(error => Promise.reject(error));;
};