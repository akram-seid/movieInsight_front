// api/movieService.js
import axios from "axios";

const baseUrl = "http://localhost:8080";

export const MovieService = {
    getPopularMovies: async (page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/movies/popular`, {
                params: {page, size},
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    searchMovies: async (params, page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/movies/filtered-movies`, {
                params: {page, size, ...params},
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getMovieDetail: async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/movies/byMovieId?movieId=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getMovieDiscussions: async (movieId, page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/forum/byMovieId`, {params: {movieId, page, size}});
            return response.data;
        } catch (error) {
            console.error("Error fetching discussions:", error);
            throw error;
        }
    },

    postDiscussion: async (discussion) => {
        try {
            const response = await axios.post(`${baseUrl}/forum/add`, discussion);
            return response.data;
        } catch (error) {
            console.error("Error fetching discussions:", error);
            throw error;
        }
    },

    postRating: async (rating) => {
        try {
            const response = await axios.post(`${baseUrl}/movies/rating`, rating);
            return response.data;
        } catch (error) {
            console.error("Error fetching discussions:", error);
            throw error;
        }
    },

    getPosts: async (page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/forum/posts`, {params: {page, size}});
            return response.data;
        } catch (error) {
            console.error("Error fetching discussions:", error);
            throw error;
        }
    },

    getPostDetail: async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/forum/byPostId?postId=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getRatingTrend: async ({signal}, from, to) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/ratingTrend`, {params: {from, to}});
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getRatingDistribution: async ({signal}, from, to) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/ratingDistribution`, {params: {from, to}});
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },
    getBudgetVsRevenue: async ({signal}, from, to) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/budgetVsRevenue`, {params: {from, to}});
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getAvgRuntime: async () => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/avgRuntime`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    genreHeatMap: async () => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/genreTitleCount`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getTopN: async (top) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/topN`, {params: {top}});
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },


};
