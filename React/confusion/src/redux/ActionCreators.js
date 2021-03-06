import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseurl";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const PostComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();
    return fetch(baseUrl + "comments",
        {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"

        }).then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("ERROR " + response.status + ":" + response.statusText+"e1");
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message+"e2");
                throw errmess;
            }).then(response => 
                {
                return(response.json());
                })
        .then(response =>{ 
        
            dispatch(addComment(response));
            alert(response.comment); // u can print anything in alert box that like comment author rating etc 
            })
        .catch(error => 
            {
            console.log('Post Comments', error.message);
            alert('your comment could not be posted\nError:' + error.message);
            })


}
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                //when u get response from server but there is some
                //error in response 
                var error = new Error("ERROR " + response.status + ":" + response.statusText);
                //error object
                error.response = response;
                throw error;
            }
        },
            //when u dont get any response from server side
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })

        .then(response => response.json()) //return updated comment
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) =>
({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                //when u get response from server but there is some
                //error in response 
                var error = new Error("ERROR " + response.status + ":" + response.statusText);
                //error object
                error.response = response;
                throw error;
            }
        },
            //when u dont get any response from server side
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })

        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) =>
({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                //when u get response from server but there is some
                //error in response 
                var error = new Error("ERROR " + response.status + ":" + response.statusText);
                //error object
                error.response = response;
                throw error;
            }
        },
            //when u dont get any response from server side
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })

        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) =>
({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
})

export const fetchLeaders = () => (dispatch) => 
{
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
               var error = new Error("ERROR " + response.status + ":" + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })

        .then(response => response.json()) 
        .then(leaders=> dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) =>
({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})