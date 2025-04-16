import clienteAxios from "../config/axios";

const Api = {
  clienteAxios: clienteAxios,
  token: localStorage.getItem("AUTH_TOKEN"),

  async fetch(url) {
    try {
      const { data } = await this.clienteAxios.get(`/api/${url}`, {
        headers: this.buildHeaders(),
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async post(url, body) {
    try {
      const { data } = await this.clienteAxios.post(`/api/${url}`, body, {
        headers: this.buildHeaders(),
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async put(url, body) {
    try {
      const {data} = await this.clienteAxios.put(`/api/${url}`, body, {
        headers: this.buildHeaders(),
      });
      return data
    } catch (error) {
      throw error;
    }
  },

  async delete(endpoint, id) {
    const url = `/api/${endpoint}/${id}`;
    try {
      await this.clienteAxios.delete(url, {
        headers: this.buildHeaders(),
      });
    } catch (error) {
      throw error;
    }
  },

  buildHeaders() {
    return {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${this.token}`,
    };
  },
};

export default Api;
