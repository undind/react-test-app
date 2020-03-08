import axios from "axios";

export default {
  getTickets: payload => {
    return axios.get("https://panel.perfectpanel.dev/admin/api/tickets/list", {
      params: { ...payload, key: "qrt54f7j87fvx5o7g43eyf78dher7g92", admin_id: 1 }
    });
  }
};
