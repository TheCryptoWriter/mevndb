import http from "../http-common";

class TutorialDataService {
    getAll() {
        return http.get("/advisors");
    }

    get(id) {
        return http.get(`/advisors/${id}`);
    }

    create(data) {
        return http.post("/advisors", data);
    }

    update(id, data) {
        return http.put(`/advisors/${id}`, data);
    }

    delete(id) {
        return http.delete(`/advisors/${id}`);
    }

    deleteAll() {
        return http.delete(`/advisors`);
    }

    findByTitle(title) {
        return http.get(`/advisors?title=${title}`);
    }
}

export default new TutorialDataService();