import axios from "axios";

const baseUrl = "http://localhost:8080";

const getAuthToken = () => {
    return sessionStorage.getItem('auth');
};

const getAuthHeaders = () => {
    const user = JSON.parse(getAuthToken());
    if (user) {
        return {
            headers: {
                Authorization: `Bearer ${user.token}`,
                ContentType: "application/json",
            }
        };
    }
    return {};
};

export const MovieService = {
    login: async (loginDto) => {
        try {
            const response = await axios.post(`${baseUrl}/user/login`, loginDto);
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },


    getPopularMovies: async (page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/movies/popular`, {
                params: {page, size},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching popular movies:", error);
            throw error;
        }
    },

    searchMovies: async (params, page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/movies/filtered-movies`, {
                params: {page, size, ...params},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error searching movies:", error);
            throw error;
        }
    },

    getMovieDetail: async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/movies/byMovieId?movieId=${id}`, {...getAuthHeaders()});
            return response.data;
        } catch (error) {
            console.error("Error fetching movie detail:", error);
            throw error;
        }
    },

    getMovieDiscussions: async (movieId, page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/forum/byMovieId`, {
                params: {movieId, page, size},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching movie discussions:", error);
            throw error;
        }
    },

    postDiscussion: async (discussion) => {
        try {
            const response = await axios.post(`${baseUrl}/forum/add`, discussion, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error posting discussion:", error);
            throw error;
        }
    },

    postRating: async (rating) => {
        try {
            const response = await axios.post(`${baseUrl}/movies/rating`, rating, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error posting rating:", error);
            throw error;
        }
    },

    getPosts: async (page = 0, size = 10) => {
        try {
            const response = await axios.get(`${baseUrl}/forum/posts`, {
                params: {page, size},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    },

    getPostDetail: async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/forum/byPostId?postId=${id}`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error fetching post detail:", error);
            throw error;
        }
    },

    getRatingTrend: async (from, to) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/ratingTrend`, {
                params: {from, to},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching rating trend:", error);
            throw error;
        }
    },

    getRatingDistribution: async (from, to) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/ratingDistribution`, {
                params: {from, to},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching rating distribution:", error);
            throw error;
        }
    },
    getBudgetVsRevenue: async (from, to) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/budgetVsRevenue`, {
                params: {from, to},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching budget vs revenue:", error);
            throw error;
        }
    },

    getAvgRuntime: async () => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/avgRuntime`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error fetching average runtime:", error);
            throw error;
        }
    },

    genreHeatMap: async () => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/genreTitleCount`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error fetching genre heatmap:", error);
            throw error;
        }
    },

    getTopN: async (top) => {
        try {
            const response = await axios.get(`${baseUrl}/analytics/topN`, {
                params: {top},
                ...getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching top N:", error);
            throw error;
        }
    },
    logout: () => {
        sessionStorage.removeItem('authToken');
    }
};